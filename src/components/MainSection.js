import React from 'react'
import axios from 'axios';
import { nanoid } from 'nanoid';
import { CopyToClipboard } from 'react-copy-to-clipboard'

function MainSection() {
    const [errText, setErrText] = React.useState('');
    const inputRef = React.useRef(null);
    const [formData, setFormData] = React.useState({ urlInput: "" });
    const [links, setLinks] = React.useState([]);

    React.useEffect(() => {
        if (localStorage.getItem('links')) {
            setLinks(JSON.parse(localStorage.getItem('links')))
        } else {
            localStorage.setItem('links', JSON.stringify(links));
        }

    }, [])

    React.useEffect(() => {
        localStorage.setItem('links', JSON.stringify(links));
    }, [links]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(() => {
            return {
                [name]: value
            }
        })
    }


    function makingApiCall(urlS) {
        axios.get(`https://api.shrtco.de/v2/shorten?url=${urlS}`).then(res => {
            setLinks((prevLinks) => {
                return [
                    {
                        id: nanoid(),
                        orignalLink: res.data.result.original_link,
                        shortedLink: res.data.result.short_link,
                        iscopied: false
                    },
                    ...prevLinks
                ]

            })

        })
            .catch(err => {
                setErrText(err.response.data.error);
                inputRef.current.classList.add('err-active');
            })
    }

    const shortIt = () => {
        let rgxURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (formData.urlInput !== '') {
            if (formData.urlInput.match(rgxURL)) {
                setErrText('');
                inputRef.current.classList.remove('err-active');
                makingApiCall(formData.urlInput);
                setFormData({
                    urlInput: "",
                })
            } else {
                setErrText('Please enter a valid link');
                inputRef.current.classList.add('err-active');
            }
        } else {
            setErrText('Please add a link');
            inputRef.current.classList.add('err-active');
        }



    }

    const copied = (id) => {
        setLinks(prevLinks => {
            return (
                prevLinks.map(link => {
                    return link.id === id ? { ...link, iscopied: true } : link
                })
            )
        })
    }


    const LinksDisplayed = () => {
        return (
            links.map(link => {
                return (
                    <div key={nanoid()} className='url'>
                        <h1 >{link.orignalLink}</h1>
                            <h2 >{link.shortedLink}</h2>
                            <CopyToClipboard text={link.shortedLink}>
                                <button onClick={() => copied(link.id)} className={link.iscopied ? 'copied ' : 'copy '}>{link.iscopied ? 'copied!' : 'copy'}</button>
                            </CopyToClipboard>
                        <button onClick={() => removeUrl(link.id) } className='remove'>x</button>
                    </div>
                )
            }))

    }

    const removeUrl = (id) => {
        setLinks(prevLinks => {
            return (
                prevLinks.filter((link) => {
                    return link.id !== id
                })
            )
        })
    }

    return (
        <section className='sec-2'>
            <div className='short-container'>
                <input
                    type="url"
                    placeholder='Shorten a link here...'
                    onChange={handleChange}
                    name='urlInput'
                    value={formData.urlInput}
                    ref={inputRef}
                />
                <button  onClick={shortIt}>Shorten It!</button>
                <p className='err'>{errText}</p>
            </div>
            <div className='url-container'>
                <LinksDisplayed />
            </div>
            <div className='advanced'>
                <h1>Advanced Statistics</h1>
                <p className='main-para'>  
                    Track how your links are performing across the web with our 
                    advanced statistics dashboard.
                </p>
                <div className='Statistics-container'>
                    <div className='brand '>
                        <div className='img-container'>
                            <img src='./images/icon-brand-recognition.svg' alt='brand'/>
                        </div>
                        <h2>Brand Recognition</h2>
                        <p>
                            Boost your brand recognition with each click. Generic links don’t 
                            mean a thing. Branded links help instil confidence in your content.
                        </p>
                    </div>
                    <div className='detailed'>
                        <div className='img-container'>
                            <img src='./images/icon-detailed-records.svg' alt='detailed'/>
                        </div>
                        <h2>Detailed Records</h2>
                        <p>
                            Gain insights into who is clicking your links. Knowing when and where 
                            people engage with your content helps inform better decisions.
                        </p>
                    </div>
                    <div className='fully'>
                        <div className='img-container'>
                            <img src='./images/icon-fully-customizable.svg' alt='fully'/>
                        </div>
                        <h2>Fully Customizable</h2>
                        <p>
                            Improve brand awareness and content discoverability through customizable 
                            links, supercharging audience engagement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainSection