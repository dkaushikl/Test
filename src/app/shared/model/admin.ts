

export class Employee {
  UserID: number;
  DOB: Date;
  DOJ: Date;
  DOL: Date;
  Aadharno: number;
  DesignationID: number;
  Phoneno: number;
  Salary: number;
  TotalExperience: number;
  AadharPhoto: any;
  Address: string;
  Email: string;
  FirstName: string;
  DesignationName: string;
  Fname: string;
  LastUpdatedResume: string;
  Lname: string;
  City: string;
  Panno: string;
  PanPhoto: any;
  Refrence: string;
  Password: string;
  _id: string;
}

export class Project {
  public projectName: string;
  public clientName: string;
  public teamLeader: any;
  public startDate: string;
  public estimatedHours: string;
  public adminComment: string;
  public projectId: string;
  public teamLeaderId: string;
  public EndDate: string;
  public clientcountry: string;
  public clientrefrence: string;
  public projectType: string;
  public _id: string;
}

export class StaticPages {
  public Id: number;
  public Name: string;
  public Body: string;
}

export class Setting {
  public Id: number;
  public Tag: string;
  public Value: string;
}

export class EmailTemplate {
  public Id: number;
  public Name: string;
  public Subject: string;
  public Body: string;
}


export class Category {
  public Id: number;
  public Name: string;
}
