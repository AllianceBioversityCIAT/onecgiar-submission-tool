import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import exp from 'constants';
import 'mocha';
import jwt from '../../helpers/jwt-auth';


chai.use(chaiHttp);

const initiativeId = 2;


describe('Metadata Controller - Menu', async () => {

    const user: any = {
        id: 98,
        email: 'j.cadavid@cgiar.org',
        roles: ['admin', 'customer'],
    };

    const app = 'http://localhost:3000';


    it('GET /meta/menu/  Get Metadata menu without token ', async () => {

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .then((res) => {
                expect(res.status).to.equal(400);
            });

    });

    it('GET /meta/menu/  Get Metadata menu with token', async () => {

        const token = await jwt.createToken(user);

        await chai
            .request(app)
            .get('/api/meta/menu/' + initiativeId)
            .set('auth', token)
            .then((res) => {
                console.log(res.body)
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('response').to.be.a('object');
                expect(res.body).to.have.property('title').to.be.equal('MetaData:Menu');
                expect(res).to.be.a('object')
            });

    });

});
