import chai, { expect } from 'chai';
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



after(async () => {


})


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
            .get('/api/previews/preview-partners/' + initiativeId+'/'+stageId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Full Proposal:Preview Partners');
                expect(res).to.be.a('object')
            });

    });


});
