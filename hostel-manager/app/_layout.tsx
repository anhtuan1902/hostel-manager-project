import { Slot, useRouter, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
      router.replace("/home");
    }
  }, [fontsLoaded, ]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded ) {
    return null;
  }

  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
