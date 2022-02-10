import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'


export default function ChatPage() {
    
const SUPERBASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxOTA3NCwiZXhwIjoxOTU4OTk1MDc0fQ.tCAz__-PgpXL5szbTW9zXCQ6DCanz2md2nSWQiclQ2k';
const SUPERBASE_URL = 'https://kfpmffhrsegekokgvibw.supabase.co';
const supabaseClient = createClient(SUPERBASE_URL,SUPERBASE_ANON_KEY )

    const rota = useRouter();
    const usuarioLogado = rota.query.username
    //console.log(rota.query)
    const [mensagem, setMensagem] =React.useState('');
    const [listamensagem, setListaMensagem] =React.useState([]);


    React.useEffect(()=>{
        const dados =  supabaseClient.from('tbMensagem').select('*').order('id',{ascending:false}).then(({data})=>{
            setListaMensagem(data)
        });
    },[])

    function hendleNovaMensagem(mensagemAtual){
        const mensagem = {
            texto:mensagemAtual,
            usuario: usuarioLogado,
        }
       supabaseClient.from('tbMensagem').insert([mensagem]).then(({data}) =>{
        setListaMensagem([
            data[0],
            ...listamensagem
          
        ])
       })
        setMensagem('')
    
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >


    
                    { <MessageList final={listamensagem} /> }
{/*listamensagem.map((mensagem)=>{
return(
    /*<Text key={mensagem.id}>{mensagem.usuario}:{mensagem.texto}</Text>
)
}) */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event)=> {
                                setMensagem(event.target.value)
                            }}
                            onKeyPress={(event)=> {
                                if(event.key ==='Enter'){
                                    event.preventDefault()
                                    hendleNovaMensagem(event.target.value)

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                        onClick={function(event){
                            event.preventDefault()
                            hendleNovaMensagem(mensagem)
                                }}

              label='Enviar'
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: { xs: '100%', sm: '10%' }, textAlign: 'center', marginBottom: '10px',
              }}
              buttonColors={{               
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    const rota = useRouter();
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    onClick={function(event){
                        event.preventDefault()
                        rota.push('/');
                      }}
                />
            </Box>
        </>
    )
}


function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                
            }}
        >
            {props.final.map((mensagem)=>{
                return(
<Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.usuario}.png`}
                    />
                    <Text tag="strong">
                        {mensagem.usuario}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto}
            </Text>
                );
            })}

    
        </Box>
    )
}