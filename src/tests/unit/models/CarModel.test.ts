import * as sinon from "sinon";
import chai from "chai";
const { expect } = chai;

import CarModel from "../../../models/CarModel";

import { Model } from "mongoose";
import {
  modelCreate,
  modelCreateWithId,
  modelRead,
  modelReadOne,
  modelRemove,
} from "../../mocks/mocks";

describe("Car Model", () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, "create").resolves(modelCreateWithId);
    sinon.stub(Model, "find").resolves(modelRead);
    sinon.stub(Model, "findOne").resolves(modelReadOne);
    sinon.stub(Model, "update").resolves();
    sinon.stub(Model, "remove").resolves(modelRemove);
  });

  after(() => sinon.restore());

  describe("Creating", () => {
    it("Successful", async () => {
      const car = await carModel.create(modelCreate);

      expect(car).to.deep.equal(modelCreateWithId);
    });
  });

  describe("Reading", () => {
    it("Read All", async () => {
      const allCars = await carModel.read();

      expect(allCars).to.deep.equal(modelRead);
    });

    it("Read One", async () => {
      const car = await carModel.readOne("4edd40c86762e0fb12000003");

      expect(car).to.deep.equal(modelReadOne);
    });
  });

  describe("Update/Delete", () => {
    it("Updating", async () => {
      const updated = await carModel.update(
        "4edd40c86762e0fb12000003",
        modelCreate
      );

      expect(updated).to.equal(null);
    });

    it("Deleting", async () => {
      const deleted = await carModel.delete("4edd40c86762e0fb12000003");

      expect(deleted).to.deep.equal(modelRemove);
    });
  });
});
