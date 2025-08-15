import { StyleSheet } from 'react-native';
import { Theme } from '../theme/themes';


export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.modalBackground,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
        height: 600,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
        color: theme.text
    },
    body: {
        marginBottom: 20,
        width: '100%',
        color: theme.background
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
        color: theme.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    footerButton: {
        backgroundColor: theme.elevatedButton,
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
        color: theme.text,
        marginBottom: 6,
    },
    instructionsTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600',
        color: theme.text,
    },
});
