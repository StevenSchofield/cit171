import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
// npm start
const sendText = async(phoneNumber) => {
  console.log("PhoneNumber:" , phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers: {
      'content-type':'application/text'
    }
  });
};

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setUserName}) => {
  console.log('OTP: ', oneTimePassword);

  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'
    }
  });

  const responseCode = tokenResponse.status;
  console.log("Response Status Code", responseCode);
  if (responseCode == 200){
    setUserLoggedIn(true);
  }

  const tokenResponseString = await tokenResponse.text();
  console.log("Token: ", tokenResponseString);

  const userName = await fetch('https://dev.stedi.me/validate/'+tokenResponseString);
  const userNameString = await userName.text();
  console.log("User Name", userNameString);
  setUserName(userNameString);
};

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="numeric"
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
        secureTextEntry={true}
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
            getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserName:props.setUserName});
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