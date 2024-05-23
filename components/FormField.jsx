import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '../constants';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100 ">{title}</Text>

      <View className="relative flex h-16 w-full flex-row items-center overflow-hidden rounded-2xl border-2 border-black-200 bg-black-100 focus:border-secondary">
        <TextInput
          className="relative w-full overflow-hidden px-4 font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity
            className="absolute right-1 px-3 py-2"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
