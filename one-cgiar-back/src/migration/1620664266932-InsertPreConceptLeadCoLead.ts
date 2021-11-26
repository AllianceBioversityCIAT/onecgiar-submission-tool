import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import {Users} from '../entity/Users';
import * as fs from 'fs';
import {InitiativesByStages} from '../entity/InititativesByStages';
import {InitiativesByUsers} from '../entity/InititativesByUsers';
import {ExcelUtil} from '../utils/excel-util';
import {Roles} from '../entity/Roles';

const pth = require('path').resolve(process.cwd(), '../');
const parentD = `${pth}/uploads/`;

// 1620653808976

export class InsertPreConceptLeadCoLead1620664266932
  implements MigrationInterface
{
  name = 'InsertPreConceptLeadCoLead1620664266932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const fileName = '20210430_initiatives_transformed_v1.1.xlsx';
    // const conceptRepo = getRepository(ConceptInfo);
    // const stageRepo = getRepository(Stages);
    const initvStageRepo = getRepository(InitiativesByStages);
    const userStageRepo = getRepository(InitiativesByUsers);
    const rolesRepo = getRepository(Roles);

    try {
      /**
       * initiatives by stage
       */
      const initvStgs = await initvStageRepo.find({
        relations: ['initiative', 'stage']
      });
      const leadRole = await rolesRepo.findOne({where: {acronym: 'SGD'}});
      const coleadRole = await rolesRepo.findOne({where: {acronym: 'PI'}});

      // console.log(leadRole)
      // console.log(coleadRole)

      /**
       * read excel file
       */
      const wb = new ExcelUtil(parentD + fileName);
      const wSheet = await wb.readWorkSheet('initiatives');

      for (let index = 0; index < initvStgs.length; index++) {
        /**
         *
         */
        const element = initvStgs[index];
        let user: Users;
        let usersByInitivStg = [];
        /**
         * Create lead user
         */
        if (element) {
          let excelLead = wb.getCellInRowByColumnHeader(
            wSheet,
            element.id + 1,
            'PCF002_InitLeadName'
          ).value;
          let excelLeadEmail = wb.getCellInRowByColumnHeader(
            wSheet,
            element.id + 1,
            'PCF003_InitLeadEmail'
          ).value;
          /**
           * check if user exists
           */
          user = await this.parseUser(
            excelLead.toString(),
            excelLeadEmail.toString()
          );

          /**
           * Create user by initiative
           */

          let intivUserStg = new InitiativesByUsers();
          intivUserStg.active = true;
          intivUserStg.initiative = element.initiative;
          intivUserStg.user = user;
          intivUserStg.role = leadRole;

          usersByInitivStg.push(intivUserStg);
        }
        /**
         * Create colead user
         */
        if (element) {
          let excelLead = wb.getCellInRowByColumnHeader(
            wSheet,
            element.id + 1,
            'PCF004_InitCoLeadNam'
          ).value;
          let excelLeadEmail = wb.getCellInRowByColumnHeader(
            wSheet,
            element.id + 1,
            'PCF005_InitCoEmail'
          ).value;
          /**
           * check if user exists
           */
          user = await this.parseUser(
            excelLead.toString(),
            excelLeadEmail.toString()
          );

          /**
           * Create user by initiative
           */

          let intivUserStg = new InitiativesByUsers();
          intivUserStg.active = true;
          intivUserStg.initiative = element.initiative;
          intivUserStg.user = user;
          intivUserStg.role = coleadRole;

          usersByInitivStg.push(intivUserStg);
        }

        const r = await userStageRepo.save(usersByInitivStg);
        console.log(r);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  /***
   *
   */
  private async parseUser(user: string, email: string) {
    email = email.toLowerCase();
    console.log(email);

    /**
     * check if user already exists
     */
    const userRepo = getRepository(Users);
    const BDuser = await userRepo.findOne({email});

    if (BDuser != null) {
      return BDuser;
    }

    /**
     * create new user
     */
    let newUser: Users = new Users();
    const [firstName, ...others] = user.split(' ');
    newUser.first_name = firstName;
    newUser.last_name = others.join(' ');
    newUser.email = email;

    /**
     * validate if is CGIAR
     */
    const isCGIAR = email.indexOf('@cgiar.org') !== -1 ? true : false;
    newUser.is_cgiar = isCGIAR ? true : false;
    newUser.password = isCGIAR ? null : this.generatePassword();

    this.writeUserAndPasswords(newUser);

    /**
     * hash password
     */
    if (!newUser.is_cgiar) {
      newUser.hashPassword();
    }
    /**
     * save new user
     */
    newUser = await userRepo.save(newUser);
    return newUser;
  }

  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  private writeUserAndPasswords(user: Users) {
    let txt = `
        ------------------------------
        first name: ${user.first_name},
        last name: ${user.last_name},
        email: ${user.email},
        is_cgiar: ${user.is_cgiar},
        password: ${user.password},
        ------------------------------
         `;
    fs.appendFile(`${parentD}/users.txt`, txt, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
