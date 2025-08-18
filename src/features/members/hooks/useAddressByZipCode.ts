import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { AddressService } from "../domain/services/addressService";

interface UseAddressByZipCodeProps {
  zipCode: string;
  setValue: (name: any, value: any, options?: any) => void;
}

export const useAddressByZipCode = ({
  zipCode,
  setValue,
}: UseAddressByZipCodeProps) => {
  const [debouncedZipCode] = useDebounce(zipCode, 350);

  useEffect(() => {
    const fetchAddress = async () => {
      if (debouncedZipCode?.length === 9) {
        const address = await AddressService.getAddressByZipCode(
          debouncedZipCode
        );
        if (address) {
          setValue("street", address.logradouro, { shouldValidate: true });
          setValue("neighborhood", address.bairro, { shouldValidate: true });
          setValue("city", address.localidade, { shouldValidate: true });
          setValue("uf", address.uf, { shouldValidate: true });
        }
      }
    };

    fetchAddress();
  }, [debouncedZipCode, setValue]);
};
