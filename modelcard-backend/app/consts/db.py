import enum


class AlembicScriptPath(enum.Enum):
    SCRIPT_DIR = "versions"
    # 코드 레벨 1 ID 매핑
    CODE_LEVEL_1_IDS = {
        "MODEL_STATE": "MS",
        "USER_TYPE": "US",
        "FILTER": "FI",
        "ORDER": "OR",
        "MODEL_TYPE": "MT",
        "TASK": "TA",
        "FRAMEWORK": "FW",
        "LICENSE": "LI",
    }

    # 코드 레벨 1 이름 매핑
    CODE_LEVEL_1_NAMES = {
        "MS": "Model State",
        "US": "User Type",
        "FI": "Filter",
        "OR": "Order",
        "MT": "Model Type",
        "TA": "Task",
        "FW": "Framework",
        "LI": "License",
    }
    ABBREVIATION_TO_MODEL_TYPE = {
        "CV": "Computer Vision",
        "TS": "Time Series",
        "AU": "Audio",
        "TE": "Text",
        "MM": "Multi Modal",
        "LG": "Language",
    }
