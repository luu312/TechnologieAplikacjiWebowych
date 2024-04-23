import { IPost, Query } from "../models/data.model";
import PostModel from "../schemas/data.schema";
import mongoose from "mongoose";


class DataService {
  public async createPost(postParams: IPost) {
    try {
      const dataModel = new PostModel(postParams);
      await dataModel.save();
      return dataModel;
    } catch (error) {
      console.error("Błąd podczas tworzenia posta:", error);
      throw new Error("Błąd podczas tworzenia posta");
    }
  }

  public async query(query: Query<number | string | boolean>) {
    try {
      const result = await PostModel.find(query);
      return result;
    } catch (error) {
      console.error("Błąd podczas wykonywania zapytania:", error);
      throw new Error("Błąd podczas wykonywania zapytania");
    }
  }

  public async getById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Nieprawidłowe ID");
    }
    try {
      const result = await PostModel.findById(id);
      return result;
    } catch (error) {
      console.error(`Error retrieving data by ID: ${error}`);
      throw new Error("Failed to retrieve data");
    }
  }

  public async deleteById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Nieprawidłowe ID:", id);
      throw new Error("Nieprawidłowe ID");
    }
    try {
      await PostModel.findByIdAndDelete(id);
    } catch (error) {
      console.error("Błąd podczas usuwania danych:", error);
      throw new Error("Błąd podczas usuwania danych");
    }
  }

  public async deleteAllPosts() {
    try {
      await PostModel.deleteMany({});
    } catch (error) {
      console.error("Błąd podczas usuwania wszystkich postów:", error);
      throw new Error("Błąd podczas usuwania wszystkich postów");
    }
  }

  public async deleteData(query: Query<number | string | boolean>) {
    try {
      await PostModel.deleteMany(query);
    } catch (error) {
      console.error("Błąd podczas usuwania danych:", error);
      throw new Error("Błąd podczas usuwania danych");
    }
  }
}

export default DataService;
