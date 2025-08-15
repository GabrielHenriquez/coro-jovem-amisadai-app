import * as RN from "react-native";
import * as Component from "@components/index";

interface MembersHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredMembersCount: number;
}

const MembersHeader: React.FC<MembersHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  filteredMembersCount,
}) => {
  return (
    <RN.View className="gap-4 px-4">
      <Component.Text
        className="text-center font-poppinsBold text-primary"
        size={24}
      >
        Componentes
      </Component.Text>

      <Component.SearchInput
        styleRest={{ paddingHorizontal: 16 }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Component.Text className="text-center font-poppinsSemiBold text-gray">
        {searchTerm && filteredMembersCount === 0
          ? "Nenhum componente encontrado"
          : `Quantidade de componentes: ${filteredMembersCount}`}
      </Component.Text>
    </RN.View>
  );
};

export default MembersHeader;
