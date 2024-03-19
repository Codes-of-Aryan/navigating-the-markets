import { Text, Box } from '@chakra-ui/react'

export default function WaitingBox() {
    return (
        <Box bg='gray.50' w='500' p={10} color='black' style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
            <Text> Waiting Until The Training Begins....</Text>
        </Box>
    );
}