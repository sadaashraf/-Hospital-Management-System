import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  patientCode: string;

  // ===== Personal Info =====
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "date" })
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  bloodGroup?: string;

  @Column({ nullable: true })
  maritalStatus?: string;

  @Column({ nullable: true })
  image?: string;

  // ===== Contact Details =====
  @Column()
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  zipCode?: string;

  // ===== Emergency Contact =====
  @Column({ nullable: true })
  emergencyName?: string;

  @Column({ nullable: true })
  emergencyPhone?: string;

  @Column({ nullable: true })
  emergencyRelation?: string;

  // ===== Medical Info =====
  @Column({ type: "text", nullable: true })
  allergies?: string;

  @Column({ type: "text", nullable: true })
  chronicDiseases?: string;

  @Column({ type: "text", nullable: true })
  currentMedications?: string;

  @Column({ type: "text", nullable: true })
  previousSurgeries?: string;

  @Column({ type: "text", nullable: true })
  additionalNotes?: string;

  // ===== Status & Timestamps =====
  @Column({ default: "ACTIVE" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ===== Generate patient code automatically =====
  @BeforeInsert()
  generatePatientCode() {
    // Example: P-20260127-8372
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    this.patientCode = `P-${datePart}-${randomNum}`;
  }
}
