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

})


/**Start test */
describe('FullProposal Controller', async () => {

    const initiativeId = 2;
    const stageId = 3;


    /**Workpackage*/

    it('GET workpackage/ Request all workpackage per initiative', async () => {

        await chai
            .request(app)
            .get('/api/stages-control/proposal/packages/' + initiativeId)
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Full Proposal: Workpackage.');
                expect(res).to.be.a('object')
            });

    });


    /**
     * MANAGE PLAN AND RISK
     */

    /**GET RISK ASSESSMENT */
    it('GET /manage-plan/initiativeId/sectionName/ Request Manage plan and risk ', async () => {

        await chai
            .request(app)
            .get('/api/stages-control/proposal/manage-plan/'+12+'/management_plan')
            .set('auth', token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('Full Proposal: GET manage plan risk  and files.');
                expect(res).to.be.a('object')
            });

    });


});
