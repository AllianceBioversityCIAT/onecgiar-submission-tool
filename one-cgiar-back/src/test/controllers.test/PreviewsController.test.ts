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

  //Get token test
  token = await jwt.createToken(user);
});

after(async () => {});

/**Start test */
describe('Previews Controller', async () => {
  const initiativeId = 1;
  const stageId = 3;

  /**
   *
   * PREVIEWS
   *
   * */

  /**Preview Partners */
  it('GET previewPartners/ Request partners per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/partners/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Get Partners per initiative');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Projected Benefits */
  it('GET previewProjectedBenefits/ Request projected benefits per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/projected-benefits/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Get Projected Benefits');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Geographic Scope */
  it('GET previewGeographicScope/ Request geographic scope per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/geographic-scope/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Get Geographic Scope per initiative');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Risk Assessment */
  it('GET previewRiskAssessment/ Request risk assessment per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/risk-assessment/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Risk Assessment');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Human Resources */
  it('GET previewHumanResources/ Request Human Resources per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/human-resources/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Preview Human Resources');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Financial Resources */
  it('GET previewFinancialResources/ Request Financial Resources per initiative', async () => {
    await chai
      .request(app)
      .get('/api/previews/financial-resources/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Preview Financial Resources');
        expect(res).to.be.a('object');
      });
  });
});
