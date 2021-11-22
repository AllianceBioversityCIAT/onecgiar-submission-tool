import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import jwt from '../helpers/jwt-auth';

chai.use(chaiHttp);

const app = 'http://localhost:3000';
var token: any = '';
var user = {
  id: '92',
  email: 'test@hotmail.com'
};

before(async () => {
  const initiativeId = 2;
  const stageId = 3;

  //Get user test
  // await chai
  // .request(app)
  // .post('/api/users/')
  // .type('form')
  // .send({
  //     "first_name": "test",
  //     "last_name": "test",
  //     "password": 'Test12345',
  //     "is_cgiar": false,
  //     "email": "test@hotmail.com",
  //     "roles": [1]
  // })
  // .then((res) => {
  //     user.id = res.body.response.user.id;
  //     user.email = res.body.response.user.email;
  // });

  //Get token test
  token = await jwt.createToken(user);
});

after(async () => {
  //Remove user test
  // await chai
  //     .request(app)
  //     .delete('/api/users/remove/' + user.id)
  //     .set('auth', token)
  //     .then((res) => {
  //         console.log('User ' + user.id + ' was removed.');
  //     });
});

/**Start test */
describe('FullProposal Controller', async () => {
  const initiativeId = 2;
  const stageId = 3;
  var managePlanRiskId;

  /**Workpackage*/

  it('GET workpackage/ Request all workpackage per initiative', async () => {
    await chai
      .request(app)
      .get('/api/stages-control/proposal/packages/' + initiativeId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Full Proposal: Workpackage.');
        expect(res).to.be.a('object');
      });
  });

  /**
   * MANAGE PLAN AND RISK
   */

  /**
   * GET MANAGE PLAN
   * GET RISK ASSESSMENT
   *  */
  it('GET /manage-plan/initiativeId/sectionName/ Request Manage plan and risk ', async () => {
    await chai
      .request(app)
      .get(
        '/api/stages-control/proposal/manage-plan/' +
          initiativeId +
          '/management_plan'
      )
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Full Proposal: GET manage plan risk  and files.');
        expect(res).to.be.a('object');
        managePlanRiskId = parseInt(res.body.response.managePlanData.id);
      });
  });

  /**
   * PATCH MANAGE PLAN
   * PATCH RISK ASSESSMENT
   *  */
  it('PATCH /manage-plan/initiativeId/sectionName/ Update Manage plan and risk', async () => {
    await chai
      .request(app)
      .patch(
        '/api/stages-control/proposal/manage-plan/' +
          initiativeId +
          '/7.manage-plan/' +
          stageId
      )
      .set('auth', token)
      .set('content-type', 'application/json')
      .send({
        id: managePlanRiskId,
        management_plan: 'new plan',
        active: 1,
        section: 'management_plan',
        updateFiles: [],
        riskassessment: [
          {
            id: null,
            risks_achieving_impact: 'TEST TEST TEST',
            description_risk: 'TEST TEST',
            likelihood: 5,
            impact: 1,
            risk_score: 4,
            active: 1,
            manage_plan_risk_id: null,
            opportinities: []
          }
        ]
      })
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Full Proposal: Patch management plan and risk.');
        expect(res).to.be.a('object');
      });
  });
});
