import { Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  private nextId = 101; // Counter for generating new IDs
  
  private patients: Patient[] = this.getStaticPatients();

  private getStaticPatients(): Patient[] {
    return [
      { id: 1, firstName: "James", lastName: "Smith", email: "james.smith@gmail.com", phoneNumber: "+1-555-1234", dob: "1985-03-15" },
      { id: 2, firstName: "Mary", lastName: "Johnson", email: "mary.johnson@yahoo.com", phoneNumber: "+1-555-2345", dob: "1992-07-22" },
      { id: 3, firstName: "John", lastName: "Williams", email: "john.williams@hotmail.com", phoneNumber: "+1-555-3456", dob: "1978-11-08" },
      { id: 4, firstName: "Patricia", lastName: "Brown", email: "patricia.brown@outlook.com", phoneNumber: "+1-555-4567", dob: "1995-05-12" },
      { id: 5, firstName: "Robert", lastName: "Jones", email: "robert.jones@aol.com", phoneNumber: "+1-555-5678", dob: "1960-09-30" },
      { id: 6, firstName: "Jennifer", lastName: "Garcia", email: "jennifer.garcia@icloud.com", phoneNumber: "+1-555-6789", dob: "1987-12-03" },
      { id: 7, firstName: "Michael", lastName: "Miller", email: "michael.miller@comcast.net", phoneNumber: "+1-555-7890", dob: "1983-04-18" },
      { id: 8, firstName: "Linda", lastName: "Davis", email: "linda.davis@verizon.net", phoneNumber: "+1-555-8901", dob: "1976-08-25" },
      { id: 9, firstName: "William", lastName: "Rodriguez", email: "william.rodriguez@att.net", phoneNumber: "+1-555-9012", dob: "1991-01-14" },
      { id: 10, firstName: "Elizabeth", lastName: "Martinez", email: "elizabeth.martinez@charter.net", phoneNumber: "+1-555-0123", dob: "1989-06-07" },
      { id: 11, firstName: "David", lastName: "Hernandez", email: "david.hernandez@gmail.com", phoneNumber: "+1-555-1235", dob: "1972-10-29" },
      { id: 12, firstName: "Barbara", lastName: "Lopez", email: "barbara.lopez@yahoo.com", phoneNumber: "+1-555-2346", dob: "1984-02-11" },
      { id: 13, firstName: "Richard", lastName: "Gonzalez", email: "richard.gonzalez@hotmail.com", phoneNumber: "+1-555-3457", dob: "1990-09-16" },
      { id: 14, firstName: "Susan", lastName: "Wilson", email: "susan.wilson@outlook.com", phoneNumber: "+1-555-4568", dob: "1979-12-23" },
      { id: 15, firstName: "Joseph", lastName: "Anderson", email: "joseph.anderson@aol.com", phoneNumber: "+1-555-5679", dob: "1988-05-05" },
      { id: 16, firstName: "Jessica", lastName: "Thomas", email: "jessica.thomas@icloud.com", phoneNumber: "+1-555-6780", dob: "1993-08-31" },
      { id: 17, firstName: "Thomas", lastName: "Taylor", email: "thomas.taylor@comcast.net", phoneNumber: "+1-555-7891", dob: "1975-03-19" },
      { id: 18, firstName: "Sarah", lastName: "Moore", email: "sarah.moore@verizon.net", phoneNumber: "+1-555-8902", dob: "1986-11-12" },
      { id: 19, firstName: "Christopher", lastName: "Jackson", email: "christopher.jackson@att.net", phoneNumber: "+1-555-9013", dob: "1982-07-28" },
      { id: 20, firstName: "Karen", lastName: "Martin", email: "karen.martin@charter.net", phoneNumber: "+1-555-0124", dob: "1994-01-02" },
      { id: 21, firstName: "Charles", lastName: "Lee", email: "charles.lee@gmail.com", phoneNumber: "+1-555-1236", dob: "1977-04-15" },
      { id: 22, firstName: "Nancy", lastName: "Perez", email: "nancy.perez@yahoo.com", phoneNumber: "+1-555-2347", dob: "1985-10-08" },
      { id: 23, firstName: "Daniel", lastName: "Thompson", email: "daniel.thompson@hotmail.com", phoneNumber: "+1-555-3458", dob: "1991-06-21" },
      { id: 24, firstName: "Lisa", lastName: "White", email: "lisa.white@outlook.com", phoneNumber: "+1-555-4569", dob: "1980-12-14" },
      { id: 25, firstName: "Matthew", lastName: "Harris", email: "matthew.harris@aol.com", phoneNumber: "+1-555-5680", dob: "1987-03-27" },
      { id: 26, firstName: "Betty", lastName: "Sanchez", email: "betty.sanchez@icloud.com", phoneNumber: "+1-555-6781", dob: "1973-09-03" },
      { id: 27, firstName: "Anthony", lastName: "Clark", email: "anthony.clark@comcast.net", phoneNumber: "+1-555-7892", dob: "1989-02-16" },
      { id: 28, firstName: "Helen", lastName: "Ramirez", email: "helen.ramirez@verizon.net", phoneNumber: "+1-555-8903", dob: "1984-08-09" },
      { id: 29, firstName: "Mark", lastName: "Lewis", email: "mark.lewis@att.net", phoneNumber: "+1-555-9014", dob: "1992-05-22" },
      { id: 30, firstName: "Sandra", lastName: "Robinson", email: "sandra.robinson@charter.net", phoneNumber: "+1-555-0125", dob: "1978-11-05" },
      { id: 31, firstName: "Donald", lastName: "Walker", email: "donald.walker@gmail.com", phoneNumber: "+1-555-1237", dob: "1986-07-18" },
      { id: 32, firstName: "Donna", lastName: "Young", email: "donna.young@yahoo.com", phoneNumber: "+1-555-2348", dob: "1981-01-31" },
      { id: 33, firstName: "Steven", lastName: "Allen", email: "steven.allen@hotmail.com", phoneNumber: "+1-555-3459", dob: "1990-04-13" },
      { id: 34, firstName: "Carol", lastName: "King", email: "carol.king@outlook.com", phoneNumber: "+1-555-4570", dob: "1975-10-26" },
      { id: 35, firstName: "Paul", lastName: "Wright", email: "paul.wright@aol.com", phoneNumber: "+1-555-5681", dob: "1988-06-08" },
      { id: 36, firstName: "Ruth", lastName: "Scott", email: "ruth.scott@icloud.com", phoneNumber: "+1-555-6782", dob: "1983-12-21" },
      { id: 37, firstName: "Andrew", lastName: "Torres", email: "andrew.torres@comcast.net", phoneNumber: "+1-555-7893", dob: "1991-03-04" },
      { id: 38, firstName: "Sharon", lastName: "Nguyen", email: "sharon.nguyen@verizon.net", phoneNumber: "+1-555-8904", dob: "1979-09-17" },
      { id: 39, firstName: "Joshua", lastName: "Hill", email: "joshua.hill@att.net", phoneNumber: "+1-555-9015", dob: "1987-02-28" },
      { id: 40, firstName: "Michelle", lastName: "Flores", email: "michelle.flores@charter.net", phoneNumber: "+1-555-0126", dob: "1994-08-11" },
      { id: 41, firstName: "Kenneth", lastName: "Green", email: "kenneth.green@gmail.com", phoneNumber: "+1-555-1238", dob: "1976-05-24" },
      { id: 42, firstName: "Laura", lastName: "Adams", email: "laura.adams@yahoo.com", phoneNumber: "+1-555-2349", dob: "1985-11-06" },
      { id: 43, firstName: "Kevin", lastName: "Nelson", email: "kevin.nelson@hotmail.com", phoneNumber: "+1-555-3460", dob: "1982-07-19" },
      { id: 44, firstName: "Kimberly", lastName: "Baker", email: "kimberly.baker@outlook.com", phoneNumber: "+1-555-4571", dob: "1989-01-01" },
      { id: 45, firstName: "Brian", lastName: "Hall", email: "brian.hall@aol.com", phoneNumber: "+1-555-5682", dob: "1977-04-14" },
      { id: 46, firstName: "George", lastName: "Rivera", email: "george.rivera@icloud.com", phoneNumber: "+1-555-6783", dob: "1984-10-27" },
      { id: 47, firstName: "Deborah", lastName: "Campbell", email: "deborah.campbell@comcast.net", phoneNumber: "+1-555-7894", dob: "1992-06-09" },
      { id: 48, firstName: "Timothy", lastName: "Mitchell", email: "timothy.mitchell@verizon.net", phoneNumber: "+1-555-8905", dob: "1980-12-22" },
      { id: 49, firstName: "Dorothy", lastName: "Carter", email: "dorothy.carter@att.net", phoneNumber: "+1-555-9016", dob: "1988-03-05" },
      { id: 50, firstName: "Ronald", lastName: "Roberts", email: "ronald.roberts@charter.net", phoneNumber: "+1-555-0127", dob: "1973-09-18" },
      { id: 51, firstName: "Jason", lastName: "Gomez", email: "jason.gomez@gmail.com", phoneNumber: "+1-555-1239", dob: "1986-02-29" },
      { id: 52, firstName: "Nancy", lastName: "Phillips", email: "nancy.phillips@yahoo.com", phoneNumber: "+1-555-2350", dob: "1981-08-12" },
      { id: 53, firstName: "Edward", lastName: "Evans", email: "edward.evans@hotmail.com", phoneNumber: "+1-555-3461", dob: "1990-05-25" },
      { id: 54, firstName: "Karen", lastName: "Turner", email: "karen.turner@outlook.com", phoneNumber: "+1-555-4572", dob: "1975-11-07" },
      { id: 55, firstName: "Jeffrey", lastName: "Diaz", email: "jeffrey.diaz@aol.com", phoneNumber: "+1-555-5683", dob: "1987-07-20" },
      { id: 56, firstName: "Betty", lastName: "Parker", email: "betty.parker@icloud.com", phoneNumber: "+1-555-6784", dob: "1983-01-03" },
      { id: 57, firstName: "Ryan", lastName: "Cruz", email: "ryan.cruz@comcast.net", phoneNumber: "+1-555-7895", dob: "1991-04-16" },
      { id: 58, firstName: "Helen", lastName: "Edwards", email: "helen.edwards@verizon.net", phoneNumber: "+1-555-8906", dob: "1979-10-29" },
      { id: 59, firstName: "Jacob", lastName: "Collins", email: "jacob.collins@att.net", phoneNumber: "+1-555-9017", dob: "1988-06-11" },
      { id: 60, firstName: "Sandra", lastName: "Reyes", email: "sandra.reyes@charter.net", phoneNumber: "+1-555-0128", dob: "1984-12-24" },
      { id: 61, firstName: "Gary", lastName: "Stewart", email: "gary.stewart@gmail.com", phoneNumber: "+1-555-1240", dob: "1992-03-07" },
      { id: 62, firstName: "Donna", lastName: "Morris", email: "donna.morris@yahoo.com", phoneNumber: "+1-555-2351", dob: "1978-09-20" },
      { id: 63, firstName: "Nicholas", lastName: "Morales", email: "nicholas.morales@hotmail.com", phoneNumber: "+1-555-3462", dob: "1986-02-02" },
      { id: 64, firstName: "Carol", lastName: "Murphy", email: "carol.murphy@outlook.com", phoneNumber: "+1-555-4573", dob: "1981-08-15" },
      { id: 65, firstName: "Eric", lastName: "Cook", email: "eric.cook@aol.com", phoneNumber: "+1-555-5684", dob: "1989-05-28" },
      { id: 66, firstName: "Ruth", lastName: "Rogers", email: "ruth.rogers@icloud.com", phoneNumber: "+1-555-6785", dob: "1975-11-10" },
      { id: 67, firstName: "Jonathan", lastName: "Gutierrez", email: "jonathan.gutierrez@comcast.net", phoneNumber: "+1-555-7896", dob: "1987-07-23" },
      { id: 68, firstName: "Sharon", lastName: "Ortiz", email: "sharon.ortiz@verizon.net", phoneNumber: "+1-555-8907", dob: "1983-01-05" },
      { id: 69, firstName: "Stephen", lastName: "Morgan", email: "stephen.morgan@att.net", phoneNumber: "+1-555-9018", dob: "1990-04-18" },
      { id: 70, firstName: "Michelle", lastName: "Cooper", email: "michelle.cooper@charter.net", phoneNumber: "+1-555-0129", dob: "1976-10-31" },
      { id: 71, firstName: "Larry", lastName: "Peterson", email: "larry.peterson@gmail.com", phoneNumber: "+1-555-1241", dob: "1985-06-13" },
      { id: 72, firstName: "Laura", lastName: "Bailey", email: "laura.bailey@yahoo.com", phoneNumber: "+1-555-2352", dob: "1982-12-26" },
      { id: 73, firstName: "Justin", lastName: "Reed", email: "justin.reed@hotmail.com", phoneNumber: "+1-555-3463", dob: "1991-03-09" },
      { id: 74, firstName: "Sarah", lastName: "Kelly", email: "sarah.kelly@outlook.com", phoneNumber: "+1-555-4574", dob: "1979-09-22" },
      { id: 75, firstName: "Scott", lastName: "Howard", email: "scott.howard@aol.com", phoneNumber: "+1-555-5685", dob: "1988-02-04" },
      { id: 76, firstName: "Kimberly", lastName: "Ramos", email: "kimberly.ramos@icloud.com", phoneNumber: "+1-555-6786", dob: "1984-08-17" },
      { id: 77, firstName: "Brandon", lastName: "Kim", email: "brandon.kim@comcast.net", phoneNumber: "+1-555-7897", dob: "1993-05-30" },
      { id: 78, firstName: "Deborah", lastName: "Cox", email: "deborah.cox@verizon.net", phoneNumber: "+1-555-8908", dob: "1977-11-12" },
      { id: 79, firstName: "Benjamin", lastName: "Ward", email: "benjamin.ward@att.net", phoneNumber: "+1-555-9019", dob: "1986-07-25" },
      { id: 80, firstName: "Dorothy", lastName: "Richardson", email: "dorothy.richardson@charter.net", phoneNumber: "+1-555-0130", dob: "1982-01-07" },
      { id: 81, firstName: "Samuel", lastName: "Watson", email: "samuel.watson@gmail.com", phoneNumber: "+1-555-1242", dob: "1990-04-20" },
      { id: 82, firstName: "Amy", lastName: "Brooks", email: "amy.brooks@yahoo.com", phoneNumber: "+1-555-2353", dob: "1975-10-03" },
      { id: 83, firstName: "Gregory", lastName: "Chavez", email: "gregory.chavez@hotmail.com", phoneNumber: "+1-555-3464", dob: "1987-06-16" },
      { id: 84, firstName: "Angela", lastName: "Wood", email: "angela.wood@outlook.com", phoneNumber: "+1-555-4575", dob: "1983-12-29" },
      { id: 85, firstName: "Frank", lastName: "James", email: "frank.james@aol.com", phoneNumber: "+1-555-5686", dob: "1991-03-11" },
      { id: 86, firstName: "Ashley", lastName: "Bennett", email: "ashley.bennett@icloud.com", phoneNumber: "+1-555-6787", dob: "1979-09-24" },
      { id: 87, firstName: "Alexander", lastName: "Gray", email: "alexander.gray@comcast.net", phoneNumber: "+1-555-7898", dob: "1988-02-06" },
      { id: 88, firstName: "Brenda", lastName: "Mendoza", email: "brenda.mendoza@verizon.net", phoneNumber: "+1-555-8909", dob: "1984-08-19" },
      { id: 89, firstName: "Raymond", lastName: "Ruiz", email: "raymond.ruiz@att.net", phoneNumber: "+1-555-9020", dob: "1992-05-01" },
      { id: 90, firstName: "Emma", lastName: "Hughes", email: "emma.hughes@charter.net", phoneNumber: "+1-555-0131", dob: "1978-11-14" },
      { id: 91, firstName: "Jack", lastName: "Price", email: "jack.price@gmail.com", phoneNumber: "+1-555-1243", dob: "1986-07-27" },
      { id: 92, firstName: "Olivia", lastName: "Alvarez", email: "olivia.alvarez@yahoo.com", phoneNumber: "+1-555-2354", dob: "1981-01-09" },
      { id: 93, firstName: "Dennis", lastName: "Castillo", email: "dennis.castillo@hotmail.com", phoneNumber: "+1-555-3465", dob: "1989-04-22" },
      { id: 94, firstName: "Cynthia", lastName: "Sanders", email: "cynthia.sanders@outlook.com", phoneNumber: "+1-555-4576", dob: "1975-10-05" },
      { id: 95, firstName: "Jerry", lastName: "Patel", email: "jerry.patel@aol.com", phoneNumber: "+1-555-5687", dob: "1987-06-18" },
      { id: 96, firstName: "Marie", lastName: "Myers", email: "marie.myers@icloud.com", phoneNumber: "+1-555-6788", dob: "1983-12-31" },
      { id: 97, firstName: "Tyler", lastName: "Long", email: "tyler.long@comcast.net", phoneNumber: "+1-555-7899", dob: "1990-03-13" },
      { id: 98, firstName: "Janet", lastName: "Ross", email: "janet.ross@verizon.net", phoneNumber: "+1-555-8910", dob: "1976-09-26" },
      { id: 99, firstName: "Aaron", lastName: "Foster", email: "aaron.foster@att.net", phoneNumber: "+1-555-9021", dob: "1985-02-08" },
      { id: 100, firstName: "Catherine", lastName: "Jimenez", email: "catherine.jimenez@charter.net", phoneNumber: "+1-555-0132", dob: "1982-08-21" }
    ];
  }


  findAll(): Patient[] {
    return this.patients;
  }

  findOne(id: number): Patient {
    const patient = this.patients.find(p => p.id === id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  create(createPatientDto: CreatePatientDto): Patient {
    const newPatient: Patient = {
      id: this.nextId++,
      ...createPatientDto,
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  update(id: number, updatePatientDto: UpdatePatientDto): Patient {
    const patientIndex = this.patients.findIndex(p => p.id === id);
    if (patientIndex === -1) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    const updatedPatient = {
      ...this.patients[patientIndex],
      ...updatePatientDto,
    };

    this.patients[patientIndex] = updatedPatient;
    return updatedPatient;
  }

  remove(id: number): void {
    const patientIndex = this.patients.findIndex(p => p.id === id);
    if (patientIndex === -1) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    this.patients.splice(patientIndex, 1);
  }
}