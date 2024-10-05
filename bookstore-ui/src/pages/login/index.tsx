// src/Login.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@services/firebase";
import { useNavigate } from "react-router-dom";
import { createUser, getUserById } from "src/api/users";
import { User } from "../../types/user";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      const user = result.user;
      const userData: User = {
        uid: user.uid,
        email: user.email ?? "",
        name: user.displayName ?? "",
      };

      const userExists = await getUserById(user.uid);

      if (userExists.status === 404) {
        await createUser(token, userData);
      }

      navigate("/home/books");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <Box maxWidth="240px" className="mx-auto mt-20">
        <Card>
          <Box>
            <Flex className="!justify-center">
              <Text className="text-2xl font-extrabold text-slate-900 text-center">
                Login
              </Text>
            </Flex>
            <Box className="mt-4">
              <Flex className="!justify-center">
                <Button className="!rounded-full" onClick={handleLogin}>
                  Login with Google
                </Button>
              </Flex>
            </Box>
          </Box>
          <Flex className="!justify-center mt-4">
            <Text className="text-sm">Login with your gmail account</Text>
          </Flex>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
