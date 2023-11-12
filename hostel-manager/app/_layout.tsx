import { Slot, useRouter, SplashScreen, useSegments } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { AuthProvider, useAuth } from "../provider/AuthProvider";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
  useEffect(() => {
    if (!initialized && !fontsLoaded) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === "(auth)";

    if (session && !inAuthGroup && fontsLoaded) {
      // Redirect authenticated users to the list page
      SplashScreen.hideAsync();
      router.replace("/home");
    } else if (!session && fontsLoaded) {
      // Redirect unauthenticated users to the login page
      SplashScreen.hideAsync();
      router.replace("/login");
    }
  }, [session, initialized, fontsLoaded]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
