import React from "react";
import { colors } from "@styles/colors";
import * as RN from "react-native";
import * as Component from "@components/index";
import { Mic2, Pen, Trash2 } from "lucide-react-native";
import getHeight from "@utils/getHeight";

const MemberPreview = () => {
  return (
    <RN.View className="items-center px-6">
      <RN.Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/coro-jovem-amisadai.appspot.com/o/component-Gabriel%20Henrique%20Soares-002684712%2FprofileImage?alt=media&token=188f4a75-42e6-4a55-9322-56e10cbc36dc",
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
          Gabriel Henrique Soares
        </Component.Text>

        <RN.View className="flex-row gap-2 items-center">
          <Mic2 color={colors.gray} size={20} />
          <Component.Text
            size={18}
            className="font-poppinsMedium text-gray leading-none"
          >
            Baixo • 25 anos
          </Component.Text>
        </RN.View>
      </RN.View>

      <RN.View className="gap-2.5 mt-5 items-center">
        <RN.View className="flex-row gap-1.5">
          <Component.Text className="font-poppinsSemiBold text-black">
            Data de nascimento:
          </Component.Text>
          <Component.Text className="font-poppins text-grayDark">
            20/07/2000
          </Component.Text>
        </RN.View>
        <RN.View className="flex-row gap-1.5">
          <Component.Text className="font-poppinsSemiBold  text-black">
            Nº Cartão de membro:
          </Component.Text>
          <Component.Text className="font-poppins text-grayDark">
            23122000
          </Component.Text>
        </RN.View>
        <RN.View className="flex-row gap-1.5">
          <Component.Text className="font-poppinsSemiBold  text-black">
            Batizado no espírito santo:
          </Component.Text>
          <Component.Text className="font-poppins text-grayDark">
            Não
          </Component.Text>
        </RN.View>
        <RN.View className="flex-row gap-1.5 items-center">
          <Component.Text className="font-poppinsSemiBold  text-black">
            Endereço:
          </Component.Text>
          <Component.Text className="font-poppins text-grayDark">
            Rua mirasanta, 6275, Recife-PE
          </Component.Text>
        </RN.View>
      </RN.View>

      <Component.Spacer height={25} />

      <RN.View className="w-full gap-3">
        <Component.Button styleRest={{ height: getHeight * 0.054 }}>
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
