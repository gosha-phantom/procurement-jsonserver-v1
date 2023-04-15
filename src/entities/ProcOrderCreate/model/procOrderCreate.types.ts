export interface ProcOrderCreateID {
    ID: number;
}

export interface ProcOrderCreateBody {
    'Пользователь': number;
    'Описание': string;
    'СтатусЗаявки': string;
    'ОбоснованиеЗакупки': string;
    'Проект': string;
    'Склад': number;
}

export interface ProcOrderPosesCreateBody {
    'Заявка': number;
    'НаименованиеТовара': string;
    'ХарактеристикаТовара': string;
    'ЕИ': number;
    'Кол-во': number;
    'АртикулТовара': string;
    'Ссылка': string;
    'СтатьяЗатрат': string;
}

export interface ProcOrderCreateSchema {
    isLoading?: boolean;
    error?: string;
    procOrderID?: ProcOrderCreateID;
    procOrderBody?: ProcOrderCreateBody;
    procOrderPosesBody?: ProcOrderPosesCreateBody[];
}
