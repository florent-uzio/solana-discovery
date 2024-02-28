import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

export const SendSolForm = () => {
  return (
    <>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </>
  )
}
