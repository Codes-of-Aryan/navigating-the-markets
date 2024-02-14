import { Text, Box } from '@chakra-ui/react'

export default function WaitingBox() {
    return (
        <Box bg='gray.50' w='500' p={40} color='black'>
            <Text> Waiting Until The Training Begins....</Text>
        </Box>
    );
}