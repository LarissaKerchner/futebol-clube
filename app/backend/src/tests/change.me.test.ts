import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Should return all teams', async function () {
    const teams = [
      { id: 1, teamName: 'team 1' },
      { id: 2, teamName: 'team 2' },
      { id: 3, teamName: 'team 3' },
    ];
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teams);
  })

  it('Should return a team by id', async function () {
    const team = { id: 1, teamName: 'team 1' };
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(team);
  })

  it('Should return 404 when team not found', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(404);
    expect(body).to.be.deep.eq({ message: 'The 1 not found' });
  })

  afterEach(sinon.restore);
});
