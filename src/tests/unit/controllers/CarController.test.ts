import * as sinon from "sinon";
import { expect } from "chai";

import { Request, Response } from "express";

import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import CarController from "../../../controllers/CarController";
import {
  id,
  modelCreate,
  modelCreateWithId,
  modelRead,
  modelReadOne,
  modelRemove,
} from "../../mocks/mocks";

describe("Car Controller", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const request = {} as Request;
  const response = {} as Response;

  before(() => {
    sinon.stub(carService, "create").resolves(modelCreateWithId);
    sinon.stub(carService, "read").resolves(modelRead);
    sinon.stub(carService, "readOne").resolves(modelReadOne);
    sinon.stub(carService, "update").resolves();
    sinon.stub(carService, "delete").resolves(modelRemove);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => sinon.restore());

  it("Creating", async () => {
    request.body = modelCreate;

    await carController.create(request, response);

    expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((response.json as sinon.SinonStub).calledWith(modelCreateWithId)).to
      .be.true;
  });

  describe("Reading", () => {
    it("Read One", async () => {
      request.params = { id };

      await carController.readOne(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(modelReadOne)).to.be
        .true;
    });

    it('Read All', async () => {
      await carController.read(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(modelRead)).to.be
        .true;
    })
  });
});
