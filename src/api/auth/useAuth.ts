import {useMutation} from "@tanstack/react-query";
import {AuthApi, LoginBody} from "@/api/auth/auth.ts";
import {useToast} from "@/components/ui/use-toast.ts";


export default function useSignIn(callback: Function) {
    const { toast } = useToast()
    const {
        mutate: loginUser,
        data: userToken
    } = useMutation({
        mutationKey: ['user-auth'],
        mutationFn: function(credentials: LoginBody) {
            return AuthApi.loginUser(credentials).then(({data}) => data);
    },
    onSuccess: (data, variables, context) => {
            callback(data, variables, context);
    },
    onError: (error) => {
        const UNAUTHORIZED_STATUS = error.response.status === 401

        if (UNAUTHORIZED_STATUS) {
                toast({
                    variant: "destructive",
                    title: "Authorization failed",
                    description: "Login failed - your username or password is incorrect. Please try again."
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Authorization failed",
                    description: "There was a problem with your request. Please try again later..."
                })
            }
    }
    });

    return { loginUser, userToken };
}