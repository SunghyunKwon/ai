document.addEventListener('DOMContentLoaded', function() {
    // 사용자 지역 기반 언어 설정
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.substring(0, 2); // 언어 코드 (예: ko, en, ja, es, zh)

    // 다국어 지원 객체
    const translations = {
        ko: {
            title: 'AI 서비스 & AI 에이전트 서비스 모음',
            description: '다양한 AI 서비스 및 AI 에이전트 서비스 링크를 제공합니다.',
            ai_services: 'AI 서비스',
            conversational_ai: '대화형 AI 서비스',
            ai_agents: 'AI 에이전트 서비스',
            automation_platforms: '자동화 플랫폼',
            footer: '서비스 제공 업체 정보 | 문의처 | 개인정보처리방침',
            lunit_description: '설명: 흉부 엑스레이 영상 분석 AI 서비스',
            vrew_description: '설명: 영상 편집 자동화 AI 서비스',
            mindsweeper_description: '설명: AI 기반 악성코드 탐지 서비스',
            uni_description: '설명: AI 이미지 생성 서비스',
            minidol_description: '설명: AI 기반 이미지 편집 서비스',
            supertone_description: '설명: AI 기반 음성 편집 서비스',
            gemini_description: '설명: 구글의 최신 대화형 AI 모델',
            chatgpt_description: '설명: 오픈AI의 대화형 AI 서비스',
            clova_description: '설명: 네이버의 대화형 AI 서비스',
            wrtn_description: '설명: AI 글쓰기 및 대화 서비스',
            perplexity_description: '설명: AI 기반 대화형 검색 엔진',
            claude_description: '설명: Anthropic에서 개발한 대화형 AI 서비스',
            deepseek_description: '설명: DeepSeek에서 개발한 강력한 성능의 대화형 AI 서비스',
            openai_agent_description: '설명: 오픈AI의 AI 에이전트 서비스',
            auto_gpt_description: '설명: 자율적으로 목표를 수행하는 AI 에이전트',
            babyagi_description: '설명: 작업 기반 AI 에이전트',
            e2b_description: '설명: 코딩 AI 에이전트',
            jarvis_description: '설명: 멀티모달 AI 에이전트',
            make_description: '설명: 다양한 앱과 서비스를 연결하여 워크플로우를 자동화하는 플랫폼',
            zapier_description: '설명: 웹 애플리케이션 연결 및 자동화 플랫폼',
            n8n_description: '설명: 오픈 소스 워크플로우 자동화 도구',
            ifttt_description: '설명: 다양한 앱과 기기를 연결하여 자동화하는 플랫폼'
        },
        en: {
            title: 'AI Services & AI Agent Services',
            description: 'Links to various AI services and AI agent services.',
            ai_services: 'AI Services',
            conversational_ai: 'Conversational AI Services',
            ai_agents: 'AI Agent Services',
            automation_platforms: 'Automation Platforms',
            footer: 'Service Provider Information | Contact | Privacy Policy',
            lunit_description: 'Description: AI service for chest X-ray image analysis',
            vrew_description: 'Description: AI service for video editing automation',
            mindsweeper_description: 'Description: AI-based malware detection service',
            uni_description: 'Description: AI image generation service',
            minidol_description: 'Description: AI-based image editing service',
            supertone_description: 'Description: AI-based voice editing service',
            gemini_description: 'Description: Google\'s latest conversational AI model',
            chatgpt_description: 'Description: OpenAI\'s conversational AI service',
            clova_description: 'Description: Naver\'s conversational AI service',
            wrtn_description: 'Description: AI writing and conversation service',
            perplexity_description: 'Description: AI-based conversational search engine',
            claude_description: 'Description: Conversational AI service developed by Anthropic',
            deepseek_description: 'Description: Powerful conversational AI service developed by DeepSeek',
            openai_agent_description: 'Description: OpenAI\'s AI agent service',
            auto_gpt_description: 'Description: AI agent that autonomously performs tasks',
            babyagi_description: 'Description: Task-based AI agent',
            e2b_description: 'Description: Coding AI agent',
            jarvis_description: 'Description: Multimodal AI agent',
            make_description: 'Description: Platform that automates workflows by connecting various apps and services',
            zapier_description: 'Description: Web application connection and automation platform',
            n8n_description: 'Description: Open source workflow automation tool',
            ifttt_description: 'Description: Platform that automates by connecting various apps and devices'
        },
        es: {
            title: 'Servicios de IA y Servicios de Agentes de IA',
            description: 'Enlaces a varios servicios de IA y servicios de agentes de IA.',
            ai_services: 'Servicios de IA',
            conversational_ai: 'Servicios de IA Conversacional',
            ai_agents: 'Servicios de Agentes de IA',
            automation_platforms: 'Plataformas de Automatización',
            footer: 'Información del Proveedor de Servicios | Contacto | Política de Privacidad',
            lunit_description: 'Descripción: Servicio de IA para análisis de imágenes de rayos X de tórax',
            vrew_description: 'Descripción: Servicio de IA para automatización de edición de video',
            mindsweeper_description: 'Descripción: Servicio de detección de malware basado en IA',
            uni_description: 'Descripción: Servicio de generación de imágenes de IA',
            minidol_description: 'Descripción: Servicio de edición de imágenes basado en IA',
            supertone_description: 'Descripción: Servicio de edición de voz basado en IA',
            gemini_description: 'Descripción: El último modelo de IA conversacional de Google',
            chatgpt_description: 'Descripción: Servicio de IA conversacional de OpenAI',
            clova_description: 'Descripción: Servicio de IA conversacional de Naver',
            wrtn_description: 'Descripción: Servicio de conversación y escritura de IA',
            perplexity_description: 'Descripción: Motor de búsqueda conversacional basado en IA',
            claude_description: 'Descripción: Servicio de IA conversacional desarrollado por Anthropic',
            deepseek_description: 'Descripción: Potente servicio de IA conversacional desarrollado por DeepSeek',
            openai_agent_description: 'Descripción: Servicio de agente de IA de OpenAI',
            auto_gpt_description: 'Descripción: Agente de IA que realiza tareas de forma autónoma',
            babyagi_description: 'Descripción: Agente de IA basado en tareas',
            e2b_description: 'Descripción: Agente de IA de codificación',
            jarvis_description: 'Descripción: Agente de IA multimodal',
            make_description: 'Descripción: Plataforma que automatiza flujos de trabajo conectando varias aplicaciones y servicios',
            zapier_description: 'Descripción: Plataforma de automatización y conexión de aplicaciones web',
            n8n_description: 'Descripción: Herramienta de automatización de flujo de trabajo de código abierto',
            ifttt_description: 'Descripción: Plataforma que automatiza conectando varias aplicaciones y dispositivos'
        },
        ja: {
            title: 'AIサービス＆AIエージェントサービス集',
            description: '様々なAIサービスとAIエージェントサービスのリンクを提供します。',
            ai_services: 'AIサービス',
            conversational_ai: '会話型AIサービス',
            ai_agents: 'AIエージェントサービス',
            automation_platforms: '自動化プラットフォーム',
            footer: 'サービス提供者情報 | お問い合わせ | プライバシーポリシー',
            lunit_description: '説明: 胸部X線画像分析AIサービス',
            vrew_description: '説明: 動画編集自動化AIサービス',
            mindsweeper_description: '説明: AIベースのマルウェア検出サービス',
            uni_description: '説明: AI画像生成サービス',
            minidol_description: '説明: AIベースの画像編集サービス',
            supertone_description: '説明: AIベースの音声編集サービス',
            gemini_description: '説明: Googleの最新の会話型AIモデル',
            chatgpt_description: '説明: OpenAIの会話型AIサービス',
            clova_description: '説明: Naverの会話型AIサービス',
            wrtn_description: '説明: AI文章作成および会話サービス',
            perplexity_description: '説明: AIベースの会話型検索エンジン',
            claude_description: '説明: Anthropicによって開発された会話型AIサービス',
            deepseek_description: '説明: DeepSeekによって開発された強力な会話型AIサービス',
            openai_agent_description: '説明: OpenAIのAIエージェントサービス',
            auto_gpt_description: '説明: 自律的にタスクを実行するAIエージェント',
            babyagi_description: '説明: タスクベースのAIエージェント',
            e2b_description: '説明: コーディングAIエージェント',
            jarvis_description: '説明: マルチモーダルAIエージェント',
            make_description: '説明: 様々なアプリやサービスを接続してワークフローを自動化するプラットフォーム',
            zapier_description: '説明: Webアプリケーション接続および自動化プラットフォーム',
            n8n_description: '説明: オープンソースワークフロー自動化ツール',
            ifttt_description: '説明: 様々なアプリやデバイスを接続して自動化するプラットフォーム'
        },
        zh: {
            title: 'AI服务和AI代理服务集合',
            description: '提供各种AI服务和AI代理服务的链接。',
            ai_services: 'AI服务',
            conversational_ai: '对话型AI服务',
            ai_agents: 'AI代理服务',
            automation_platforms: '自动化平台',
            footer: '服务提供商信息 | 联系方式 | 隐私政策',
            lunit_description: '描述：用于胸部X射线图像分析的AI服务',
            vrew_description: '描述：视频编辑自动化AI服务',
            mindsweeper_description: '描述：基于AI的恶意软件检测服务',
            uni_description: '描述：AI图像生成服务',
            minidol_description: '描述：基于AI的图像编辑服务',
            supertone_description: '描述：基于AI的语音编辑服务',
            gemini_description: '描述：Google最新的对话型AI模型',
            chatgpt_description: '描述：OpenAI的对话型AI服务',
            clova_description: '描述：Naver的对话型AI服务',
            wrtn_description: '描述：AI写作和对话服务',
            perplexity_description: '描述：基于AI的对话式搜索引擎',
            claude_description: '描述：Anthropic开发的对话型AI服务',
            deepseek_description: '描述：DeepSeek开发的强大对话型AI服务',
            openai_agent_description: '描述：OpenAI的AI代理服务',
            auto_gpt_description: '描述：自主执行任务的AI代理',
            babyagi_description: '描述：基于任务的AI代理',
            e2b_description: '描述：编码AI代理',
            jarvis_description: '描述：多模式AI代理',
            make_description: '描述：通过连接各种应用程序和服务来自动化工作流程的平台',
            zapier_description: '描述：Web应用程序连接和自动化平台',
            n8n_description: '描述：开源工作流自动化工具',
            ifttt_description: '描述：通过连接各种应用程序和设备进行自动化的平台'
        }
        // 필요한 다른 언어 추가
    };

    // 언어에 맞는 번역 적용 (기존 코드와 동일)
    if (translations[lang]) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = translations[lang][key];
        });
    } else {
        // 기본 언어 (영어) 적용
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = translations['en'][key];
        });
    }
});