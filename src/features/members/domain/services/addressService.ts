import axios from "axios";
import { Log } from "@services/Logger";

interface AddressData {
  logradouro: string;
  uf: string;
  bairro: string;
  localidade: string;
}

export class AddressService {
  static async getAddressByZipCode(
    zipCode: string
  ): Promise<AddressData | null> {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      const { logradouro, uf, bairro, localidade } = response?.data;
      return { logradouro, uf, bairro, localidade };
    } catch (error) {
      Log.error("Erro ao buscar CEP");
      return null;
    }
  }
}
