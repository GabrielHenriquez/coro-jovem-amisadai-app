import React from "react";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import * as Component from "@components/index";
import { Mic2, Pen, Trash2 } from "lucide-react-native";
import getHeight from "@utils/getHeight";
import { IMember } from "../domain/entities/Member";
import { calcularIdade } from "../utils/calculateAge";
import { useNavigation } from "@react-navigation/native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { getInitials } from "@utils/strings";
import ProfileImage from "@components/ProfileImage";

// Types
interface MemberDetailItemProps {
  label: string;
  value: string | number;
}

interface MemberPreviewProps {
  memberPressed: IMember;
  handleDeleteMember: (member: IMember) => void;
}

const MemberDetailItem: React.FC<MemberDetailItemProps> = ({
  label,
  value,
}) => (
  <RN.View className="flex-row gap-2 justify-center">
    <Component.Text className="font-poppinsSemiBold text-black">
      {label}:
    </Component.Text>
    <Component.Text
      className="font-poppins text-grayDark"
      style={{
        flexWrap: "wrap",
        maxWidth: "70%",
      }}
    >
      {value}
    </Component.Text>
  </RN.View>
);

const MemberHeader: React.FC<{ member: IMember }> = ({ member }) => (
  <RN.View className="gap-2 mt-4 items-center">
    <Component.Text size={22} className="font-poppinsSemiBold leading-none">
      {member?.name}
    </Component.Text>

    <RN.View className="flex-row gap-2 items-center">
      <Mic2 color={colors.gray} size={20} />
      <Component.Text
        size={18}
        className="font-poppinsMedium text-gray leading-none"
      >
        {member?.suit} • {calcularIdade(member?.birthDate)} anos
      </Component.Text>
    </RN.View>
  </RN.View>
);

const MemberDetails: React.FC<{ member: IMember }> = ({ member }) => {
  const memberDetails = [
    { label: "Data de nascimento", value: member?.birthDate },
    { label: "Nº Cartão de membro", value: member?.memberCard },
    { label: "Batizado no espírito santo", value: member?.baptized },
    {
      label: "Endereço",
      value: `${member?.street}, ${member?.number}`,
    },
  ];

  return (
    <RN.View className="gap-2.5 mt-5 w-full">
      {memberDetails.map((detail, index) => (
        <MemberDetailItem
          key={index}
          label={detail.label}
          value={detail.value!}
        />
      ))}
    </RN.View>
  );
};

const ActionButtons: React.FC<{
  member: IMember;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ member, onEdit, onDelete }) => (
  <RN.View className="w-full gap-3">
    <Component.Button
      styleRest={{ height: getHeight * 0.054 }}
      onPress={onEdit}
    >
      <Pen color={colors.white} size={18} />
      <Component.Text size={15} className="font-poppinsSemiBold text-white">
        Editar Componente
      </Component.Text>
    </Component.Button>

    <Component.Button
      bgColor="white"
      styleRest={{
        borderWidth: 1.5,
        borderColor: colors.redDark,
        height: getHeight * 0.054,
      }}
      onPress={onDelete}
    >
      <Trash2 color={colors.redDark} size={18} />
      <Component.Text size={15} className="font-poppinsSemiBold text-redDark">
        Excluir Componente
      </Component.Text>
    </Component.Button>
  </RN.View>
);

// Main component
const MemberPreview: React.FC<MemberPreviewProps> = ({
  memberPressed,
  handleDeleteMember,
}) => {
  const { navigate } = useNavigation<any>();
  const { close } = useBottomSheet();

  const handleEdit = () => {
    close();
    setTimeout(() => {
      navigate("MembersNavigation", {
        screen: "RegisterMember",
        params: {
          member: memberPressed,
        },
      });
    }, 500);
  };

  const handleDelete = () => {
    handleDeleteMember(memberPressed);
  };

  return (
    <RN.View className="items-center px-10">
      <ProfileImage
        data={{
          name: memberPressed?.name,
          uri: memberPressed?.profileImageUri,
        }}
        size={90}
      />
      <MemberHeader member={memberPressed} />
      <MemberDetails member={memberPressed} />
      <Component.Spacer height={25} />
      <ActionButtons
        member={memberPressed}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </RN.View>
  );
};

export default MemberPreview;
