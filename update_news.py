import urllib.request
import xml.etree.ElementTree as ET
import json
import datetime
import html

# Google News RSS URL (Korean, query: "인공지능", "AI")
# gl=KR: Location Korea
# hl=ko: Language Korean
# ceid=KR:ko: Region and Language
RSS_URL = "https://news.google.com/rss/search?q=%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5+OR+AI+when:1d&hl=ko&gl=KR&ceid=KR:ko"

def fetch_news():
    try:
        with urllib.request.urlopen(RSS_URL) as response:
            xml_data = response.read()
            return xml_data
    except Exception as e:
        print(f"Error fetching news: {e}")
        return None

def parse_news(xml_data):
    if not xml_data:
        return []

    root = ET.fromstring(xml_data)
    news_items = []

    # Iterate through items
    for item in root.findall('./channel/item'):
        title = item.find('title').text if item.find('title') is not None else "No Title"
        link = item.find('link').text if item.find('link') is not None else "#"
        pub_date = item.find('pubDate').text if item.find('pubDate') is not None else ""
        description = item.find('description').text if item.find('description') is not None else ""

        # Clean up title (Google News often includes " - Source" at the end)
        if " - " in title:
            title = title.rsplit(" - ", 1)[0]

        # Extract simple date YYYY-MM-DD
        formatted_date = ""
        try:
            # format: Mon, 10 Mar 2025 08:30:00 GMT
            # We need to parse this. Let's use basic string parsing or datetime if standard format
            # Creating a naive parser or just storing the string if complex parsing is hard without dateutil
            # Standard library email.utils can parse RFC 2822
            from email.utils import parsedate_to_datetime
            dt = parsedate_to_datetime(pub_date)
            formatted_date = dt.strftime("%Y-%m-%d")
        except Exception:
            formatted_date = pub_date # Fallback

        # Clean HTML from description if necessary (Google RSS description is often HTML)
        # We will strip tags for the snippet
        def strip_html(text):
            import re
            clean = re.compile('<.*?>')
            return re.sub(clean, '', html.unescape(text))

        clean_desc = strip_html(description)

        news_items.append({
            "title": title,
            "url": link,
            "date": formatted_date,
            "description": clean_desc
        })

    return news_items

def save_news(news_items):
    with open('news.json', 'w', encoding='utf-8') as f:
        json.dump(news_items, f, ensure_ascii=False, indent=4)
    print(f"Saved {len(news_items)} news items to news.json")

if __name__ == "__main__":
    print("Fetching AI news...")
    xml_data = fetch_news()
    if xml_data:
        items = parse_news(xml_data)
        save_news(items)
    else:
        print("Failed to fetch news.")
