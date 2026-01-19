from datetime import datetime

SAMPLE_LEADS = [
    {
        "_id": "sample-1",
        "url": "https://openai.com",
        "title": "OpenAI | Artificial Intelligence Research",
        "description": "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial intelligence benefits all of humanity.",
        "owner_id": 1,
        "status": "HOT LEAD",
        "ml_score": 95,
        "ml_analysis": {
            "hot_hits": ["gpt-4", "neural networks", "llm", "api integration", "scalability"],
            "cold_hits": [],
            "total_hot": 5,
            "total_cold": 0
        },
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "_id": "sample-2",
        "url": "https://stripe.com",
        "title": "Stripe | Payment Infrastructure for the Internet",
        "description": "Millions of companies of all sizes use Stripe online and in person to accept payments, send payouts, and manage their businesses online.",
        "owner_id": 1,
        "status": "WARM LEAD",
        "ml_score": 72,
        "ml_analysis": {
            "hot_hits": ["payments", "fintech", "e-commerce"],
            "cold_hits": ["legacy systems"],
            "total_hot": 3,
            "total_cold": 1
        },
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "_id": "sample-3",
        "url": "https://local-bakery.com",
        "title": "The Artisan Bakery",
        "description": "Homemade bread, pastries and coffee served daily in our cozy local shop.",
        "owner_id": 1,
        "status": "NEUTRAL",
        "ml_score": 10,
        "ml_analysis": {
            "hot_hits": [],
            "cold_hits": ["physical location only", "no cloud services"],
            "total_hot": 0,
            "total_cold": 2
        },
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "_id": "sample-4",
        "url": "https://datacamp.com",
        "title": "DataCamp - Learn Data Science Online",
        "description": "Learn the data skills you need online at your own pace—from non-coding essentials to data science and machine learning.",
        "owner_id": 1,
        "status": "HOT LEAD",
        "ml_score": 88,
        "ml_analysis": {
            "hot_hits": ["python", "data science", "online learning", "r programming"],
            "cold_hits": [],
            "total_hot": 4,
            "total_cold": 0
        },
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "_id": "sample-5",
        "url": "https://travel-blog-personal.io",
        "title": "My Adventure Blog",
        "description": "Follow my journey as I travel across Southeast Asia with just a backpack and a camera.",
        "owner_id": 1,
        "status": "WARM LEAD",
        "ml_score": 40,
        "ml_analysis": {
            "hot_hits": ["wordpress"],
            "cold_hits": ["low budget", "personal project"],
            "total_hot": 1,
            "total_cold": 2
        },
        "created_at": datetime.utcnow().isoformat()
    }
]