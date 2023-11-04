import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { colors } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/Icon";
import { useAuth } from "../../provider/AuthProvider";
import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";
import Account from "../../components/Account";

const profile = () => {
  const { signOut } = useAuth();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <View>
        {session && session.user ? (
            <Account key={session.user.id} session={session} />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={styles.foorer}>
        <TouchableOpacity style={styles.btn} onPress={signOut}>
          <Icon name="LogOut" size={30} color={colors.white} />
          <View>
            <Text style={{ color: colors.white, fontSize: 20 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  navigation: {
    flex: 2,
    backgroundColor: colors.primary,

    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
  },
  foorer: {
    flex: 2
  },
  
  btn: {
    fontFamily: "open-sans",
    flexDirection: "row",
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
});
