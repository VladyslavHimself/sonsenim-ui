import {useMutation} from "@tanstack/react-query";
import {AuthApi, RegisterBody} from "@/api/auth/auth.ts";
import {useToast} from "@/components/ui/use-toast.ts";


export default function useSignUp(callback: Function) {
    const { toast } = useToast()
    const { mutate: registerUser} = useMutation({
        mutationKey: ['user-auth'],
        mutationFn: (credentials: RegisterBody) => AuthApi.registerUser(credentials).then(({data}) => data),
    onSuccess: (data, variables, context) => {
            callback(data, variables, context);
    },
    onError: () =>
        toast({
            variant: "destructive",
            title: "Registration failed",
            description: "Registration failed, please try again later"
        })
    });

    return { registerUser };
}