import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
        height: 600,
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    body: {
        marginBottom: 20,
        width: '100%',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    footerButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 6,
        minWidth: 100,
        alignItems: 'center',
    },
    footerButtonPlaceholder: {
        minWidth: 100,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
    bulletList: {
        marginTop: 12,
        paddingLeft: 12,
    },
    bulletItem: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
    },
    instructionsTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
