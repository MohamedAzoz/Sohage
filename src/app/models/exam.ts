export interface Exam {
  id: string;
  title: string;
  subjectId: string;
  year: number;
  fileUrl: string;
  uploadedBy: string; 
  updatedAt: Date;
}
