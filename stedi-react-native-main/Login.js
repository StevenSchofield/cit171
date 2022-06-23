import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const sendText = async(phoneNumber) => {
  console.log("PhoneNumber:" , phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers: {
      'content-type':'application/text'
    }
  });
};

const getToken = async({phoneNumber, oneTimePassword}) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'
    }
  });

  const tokenResponseString = await tokenResponse.text();
  console.log(tokenResponseString);
};

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState("");

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-123-4567"
        placeholderTextColor='#A8A8A8'
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        keyboardType="numeric"
        placeholder="1234"
        placeholderTextColor='#A8A8A8'
        //secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          sendText(phoneNumber);
        }}
        >
        <Text>Send One-Time Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>{
            getToken({phoneNumber, oneTimePassword});
        }}
        >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin: {
    marginTop: 20,
  },
  button: {
    margin: 12,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  }
});

export default Login;