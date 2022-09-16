import * as sinon from "sinon";
import { expect } from "chai";

import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import {
  id,
  modelCreate,
  modelCreateWithId,
  modelRead,
  modelReadOne,
  modelRemove,
} from "../../mocks/mocks";
import { ZodError } from "zod";

describe("Car Service", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, "create").resolves(modelCreateWithId);
    sinon.stub(carModel, "read").resolves(modelRead);
    sinon
      .stub(carModel, "readOne")
      .onFirstCall()
      .resolves(modelReadOne)
      .onSecondCall()
      .resolves(null);
    sinon.stub(carModel, "update").resolves(modelRemove);
    sinon.stub(carModel, "delete").resolves(modelRemove);
  });

  after(() => sinon.restore());

  describe("Creating", () => {
    it("Successful", async () => {
      const car = await carService.create(modelCreate);

      expect(car).to.deep.equal(modelCreateWithId);
    });

    it("Failure", async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe("Reading", () => {
    describe("Read One", () => {
      it("Successful", async () => {
        const car = await carService.readOne(id);

        expect(car).to.deep.equal(modelReadOne);
      });
    });

    it("Read All", async () => {
      const allCars = await carService.read();

      expect(allCars).to.deep.equal(modelRead);
    });
  });

  describe("Update/Delete", () => {
    it("Updating", async () => {
      const updated = await carService.update(id, modelCreate);

      expect(updated).to.equal(modelRemove);
    });

    it("Deleting", async () => {
      const deleted = await carService.delete(id);

      expect(deleted).to.deep.equal(modelRemove);
    });
  });
});
