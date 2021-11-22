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
      .get('/api/previews/preview-partners/' + initiativeId + '/' + stageId)
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Preview Partners');
        expect(res).to.be.a('object');
      });
  });

  /**Preview Projected Benefits */
  it('GET previewProjectedBenefits/ Request projected benefits per initiative', async () => {
    await chai
      .request(app)
      .get(
        '/api/previews/preview-projected-benefits/' +
          initiativeId +
          '/' +
          stageId
      )
      .set('auth', token)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('response').to.be.a('object');
        expect(res.body)
          .to.have.property('title')
          .to.be.equal('Previews:Preview Projected Benefits');
        expect(res).to.be.a('object');
      });
  });

    /**Preview Geographic Scope */
    it('GET previewGeographicScope/ Request geographic scope per initiative', async () => {
      await chai
        .request(app)
        .get(
          '/api/previews/preview-geographic-scope/' +
            initiativeId +
            '/' +
            stageId
        )
        .set('auth', token)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('response').to.be.a('object');
          expect(res.body)
            .to.have.property('title')
            .to.be.equal('Previews:Preview Geographic Scope');
          expect(res).to.be.a('object');
        });
    });




});
