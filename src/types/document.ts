export enum DocumentStatus {
  SIGNED = 'Подписан',
  NOT_SIGNED = 'Не подписан',
  IN_PROCESS = 'В процессе',
}

export enum HRDocumentType {
  EMPLOYMENT_CONTRACT = 'Трудовой договор',
  ORDER_FOR_ADMISSION = 'Приказ о приеме',
}

export type DocumentType = {
  companySigDate: Date | null;
  companySignatureName: string;
  documentName: string;
  documentStatus: DocumentStatus;
  documentType: HRDocumentType;
  employeeNumber: string;
  employeeSigDate: Date | null;
  employeeSignatureName: string;
  id: string;
};

export type DocumentsType = DocumentType[];
