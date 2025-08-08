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

const MemberDetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <RN.View className={`flex-row gap-2 justify-center`}>
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

const MemberPreview = ({
  memberPressed,
  handleDeleteMember,
}: {
  memberPressed: IMember;
  handleDeleteMember: (member: IMember) => void;
}) => {
  const { navigate } = useNavigation<any>();
  const { close } = useBottomSheet();

  const memberDetails = [
    { label: "Data de nascimento", value: memberPressed?.birthDate },
    { label: "Nº Cartão de membro", value: memberPressed?.memberCard },
    { label: "Batizado no espírito santo", value: memberPressed?.baptized },
    {
      label: "Endereço",
      value: `${memberPressed?.street}, ${memberPressed?.number}`,
    },
  ];

  return (
    <RN.View className="items-center px-10">
      <RN.Image
        source={{
          uri: memberPressed?.profileImageUri,
        }}
        style={{
          width: 94,
          height: 94,
          borderRadius: 45,
          borderWidth: 1.5,
          borderColor: colors.gray,
        }}
      />

      <RN.View className="gap-2 mt-4 items-center">
        <Component.Text size={20} className="font-poppinsMedium leading-none">
          {memberPressed?.name}
        </Component.Text>

        <RN.View className="flex-row gap-2 items-center">
          <Mic2 color={colors.gray} size={20} />
          <Component.Text
            size={18}
            className="font-poppinsMedium text-gray leading-none"
          >
            {memberPressed?.suit} • {calcularIdade(memberPressed?.birthDate)}{" "}
            anos
          </Component.Text>
        </RN.View>
      </RN.View>

      <RN.View className="gap-2.5 mt-5 w-full">
        {memberDetails.map((detail, index) => (
          <MemberDetailItem
            key={index}
            label={detail.label}
            value={detail.value!}
            className={detail.className}
          />
        ))}
      </RN.View>

      <Component.Spacer height={25} />

      <RN.View className="w-full gap-3">
        <Component.Button
          styleRest={{ height: getHeight * 0.054 }}
          onPress={() => {
            close();
            setTimeout(() => {
              navigate("MembersNavigation", {
                screen: "RegisterMember",
                params: {
                  member: memberPressed,
                },
              });
            }, 500);
          }}
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
          onPress={() => handleDeleteMember(memberPressed)}
        >
          <Trash2 color={colors.redDark} size={18} />
          <Component.Text
            size={15}
            className="font-poppinsSemiBold text-redDark"
          >
            Excluir Componente
          </Component.Text>
        </Component.Button>
      </RN.View>
    </RN.View>
  );
};

export default MemberPreview;
