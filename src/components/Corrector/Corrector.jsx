import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
	Mic,
	MicOff,
	Download,
	Copy,
	Trash2,
	Settings,
	Volume2,
	CheckCircle,
	Wand2,
	FileText,
	Sparkles,
} from 'lucide-react'

import { toast } from 'sonner'

export default function VoiceTranscriptionApp() {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [correctedText, setCorrectedText] = useState('')
	const [isProcessing, setIsProcessing] = useState(false)
	const [language, setLanguage] = useState('es-ES')
	const recognitionRef = useRef(null)
	const finalTranscriptRef = useRef('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
			if (SpeechRecognition) {
				recognitionRef.current = new SpeechRecognition()
				recognitionRef.current.continuous = true
				recognitionRef.current.interimResults = true
				recognitionRef.current.lang = language

				recognitionRef.current.onresult = event => {
					let interimTranscript = ''

					for (let i = event.resultIndex; i < event.results.length; i++) {
						const transcriptPart = event.results[i][0].transcript
						if (event.results[i].isFinal) {
							finalTranscriptRef.current += transcriptPart + ' '
						} else {
							interimTranscript += transcriptPart
						}
					}

					setTranscript(finalTranscriptRef.current + interimTranscript)
				}

				recognitionRef.current.onend = () => {
					setIsListening(false)
				}

				recognitionRef.current.onerror = event => {
					console.error('Speech recognition error:', event)
					setIsListening(false)
					toast.error('Error de reconocimiento', {
						description: 'Hubo un problema con el reconocimiento de voz. Inténtalo de nuevo.',
					})
				}
			}
		}
	}, [language, toast])

	const startListening = () => {
		if (recognitionRef.current && !isListening) {
			try {
				finalTranscriptRef.current = ''
				recognitionRef.current.start()
				setIsListening(true)
				toast.success('Grabación iniciada', {
					title: 'Grabación iniciada',
					description: 'Comienza a hablar para transcribir tu voz.',
				})
			} catch (error) {
				console.error('Error starting recognition:', error)
				toast.error('Error', {
					title: 'Error',
					description: 'No se pudo iniciar el reconocimiento de voz.',
					variant: 'destructive',
				})
			}
		}
	}

	const stopListening = () => {
		if (recognitionRef.current && isListening) {
			recognitionRef.current.stop()
			setIsListening(false)
			toast.success('Grabación detenida', {
				title: 'Grabación detenida',
				description: 'La transcripción se ha completado.',
			})
		}
	}

	const correctGrammar = async text => {
		setIsProcessing(true)
		try {
			// Simulación de corrección gramatical
			// En una implementación real, aquí usarías una API de IA para corrección
			let corrected = text
				.replace(/\s+/g, ' ') // Espacios múltiples
				.replace(/([.!?])\s*([a-z])/g, (match, punct, letter) => punct + ' ' + letter.toUpperCase()) // Mayúsculas después de puntos
				.replace(/^[a-z]/, match => match.toUpperCase()) // Primera letra mayúscula
				.replace(/\s+([,.!?;:])/g, '$1') // Espacios antes de puntuación
				.replace(/([,.!?;:])\s*([a-zA-Z])/g, '$1 $2') // Espacios después de puntuación
				.trim()

			// Agregar punto final si no existe
			if (corrected && !corrected.match(/[.!?]$/)) {
				corrected += '.'
			}

			// Actualizar tanto el texto corregido como el transcript principal
			setCorrectedText(corrected)
			setTranscript(corrected)
			finalTranscriptRef.current = corrected

			toast.success('Texto corregido', {
				title: 'Texto corregido',
				description: 'Se ha aplicado la corrección gramatical automática.',
			})
		} catch (error) {
			console.error('Error correcting grammar:', error)
			toast.error('Error de corrección', {
				title: 'Error de corrección',
				description: 'No se pudo corregir el texto automáticamente.',
				variant: 'destructive',
			})
		} finally {
			setIsProcessing(false)
		}
	}

	const copyToClipboard = async text => {
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Copiado', {
				title: 'Copiado',
				description: 'El texto ha sido copiado al portapapeles.',
			})
		} catch (error) {
			toast.error('Error', {
				title: 'Error',
				description: 'No se pudo copiar el texto.',
				variant: 'destructive',
			})
		}
	}

	const downloadText = (text, filename) => {
		const blob = new Blob([text], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = filename
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		toast.success('Descarga iniciada', {
			title: 'Descarga iniciada',
			description: `El archivo ${filename} se está descargando.`,
		})
	}

	const clearAll = () => {
		setTranscript('')
		setCorrectedText('')
		finalTranscriptRef.current = ''
		toast.success('Contenido limpiado', {
			title: 'Contenido limpiado',
			description: 'Se ha eliminado todo el texto transcrito.',
		})
	}

	return (
		<div className="h-full bg-gradient-to-br via-blue-50 to-indigo-50 from-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			<div className="container px-4 py-8 mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
						Corrector de Voz Inteligente
					</h1>
					<p className="text-lg text-muted-foreground">Transcribe tu voz y mejora la gramática automáticamente</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Controls Panel */}
					<div className="lg:col-span-1">
						<Card className="sticky top-4 border-0 shadow-xl backdrop-blur-lg bg-white/80 dark:bg-slate-800/80">
							<CardHeader className="pb-4">
								<CardTitle className="flex gap-3 items-center text-xl">
									<div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
										<Volume2 className="w-5 h-5 text-white" />
									</div>
									Panel de Control
								</CardTitle>
								<CardDescription className="text-sm">Controla la grabación y corrección de tu texto</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Recording Status */}
								{isListening && (
									<div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 dark:from-red-900/20 dark:to-orange-900/20 dark:border-red-800">
										<div className="flex gap-2 items-center">
											<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
											<span className="font-medium text-red-700 dark:text-red-300">Grabando...</span>
										</div>
									</div>
								)}

								{/* Main Controls */}
								<div className="space-y-3">
									<Button
										onClick={isListening ? stopListening : startListening}
										variant={isListening ? 'destructive' : 'default'}
										size="lg"
										className={`w-full flex gap-3 items-center text-base font-medium transition-all duration-300 ${
											isListening
												? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg hover:from-red-600 hover:to-red-700 shadow-red-500/25'
												: 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:from-blue-600 hover:to-purple-700 shadow-blue-500/25'
										}`}>
										{isListening ? (
											<>
												<MicOff className="w-5 h-5" />
												Detener Grabación
											</>
										) : (
											<>
												<Mic className="w-5 h-5" />
												Iniciar Grabación
											</>
										)}
									</Button>

									<Button
										onClick={() => correctGrammar(transcript)}
										disabled={!transcript || isProcessing}
										variant="secondary"
										size="lg"
										className="flex gap-3 items-center w-full text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 border-0 shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700 shadow-green-500/25 disabled:opacity-50 disabled:shadow-none">
										{isProcessing ? (
											<>
												<Sparkles className="w-5 h-5 animate-spin" />
												Corrigiendo...
											</>
										) : (
											<>
												<Wand2 className="w-5 h-5" />
												Corregir Gramática
											</>
										)}
									</Button>

									<Button
										onClick={clearAll}
										disabled={!transcript && !correctedText}
										variant="outline"
										size="lg"
										className="flex gap-3 items-center w-full text-base font-medium transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground">
										<Trash2 className="w-5 h-5" />
										Limpiar Todo
									</Button>
								</div>

								{/* Stats */}
								<div className="pt-4 border-t border-border/50">
									<div className="grid grid-cols-2 gap-4 text-center">
										<div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg dark:from-blue-900/20 dark:to-indigo-900/20">
											<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{transcript.length}</div>
											<div className="text-xs text-muted-foreground">Caracteres</div>
										</div>
										<div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg dark:from-purple-900/20 dark:to-pink-900/20">
											<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
												{transcript.split(' ').filter(word => word.length > 0).length}
											</div>
											<div className="text-xs text-muted-foreground">Palabras</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Text Areas */}
					<div className="space-y-6 lg:col-span-2">
						{/* Original Transcript */}
						<Card className="border-0 shadow-xl backdrop-blur-lg bg-white/80 dark:bg-slate-800/80">
							<CardHeader>
								<CardTitle className="flex gap-3 items-center text-xl">
									<div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
										<FileText className="w-5 h-5 text-white" />
									</div>
									Texto Transcrito
									{correctedText && correctedText !== transcript && (
										<Badge className="text-white bg-gradient-to-r from-green-500 to-emerald-500">
											<CheckCircle className="mr-1 w-3 h-3" />
											Corregido
										</Badge>
									)}
								</CardTitle>
								<CardDescription>
									{transcript
										? 'Edita el texto transcrito o aplica corrección automática'
										: 'El texto transcrito aparecerá aquí'}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="relative">
									<Textarea
										value={transcript}
										onChange={e => setTranscript(e.target.value)}
										placeholder="🎤 Presiona 'Iniciar Grabación' y comienza a hablar...&#10;&#10;Tu voz se transcribirá automáticamente aquí. Luego podrás usar la corrección gramatical para mejorar el texto."
										className="min-h-[400px] resize-none w-full text-base leading-relaxed border-2 border-dashed border-border/50 focus:border-solid focus:border-blue-500 transition-all duration-300 bg-gradient-to-br from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-700/50"
									/>
									{isProcessing && (
										<div className="flex absolute inset-0 justify-center items-center rounded-md backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
											<div className="flex gap-3 items-center p-4 bg-white rounded-lg border shadow-lg dark:bg-slate-800">
												<Sparkles className="w-5 h-5 text-green-500 animate-spin" />
												<span className="font-medium text-green-600 dark:text-green-400">
													Aplicando corrección gramatical...
												</span>
											</div>
										</div>
									)}
								</div>

								<div className="flex flex-wrap gap-2 pt-2">
									<Button
										onClick={() => copyToClipboard(transcript)}
										disabled={!transcript}
										variant="outline"
										size="sm"
										className="flex gap-2 items-center transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
										<Copy className="w-4 h-4" />
										Copiar Texto
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Corrected Text Preview - Only show when there's corrected text */}
						{correctedText && correctedText !== transcript && (
							<Card className="bg-gradient-to-br border-0 border-green-200 shadow-xl backdrop-blur-lg from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800">
								<CardHeader>
									<CardTitle className="flex gap-3 items-center text-xl text-green-700 dark:text-green-300">
										<div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
											<CheckCircle className="w-5 h-5 text-white" />
										</div>
										Vista Previa - Texto Corregido
									</CardTitle>
									<CardDescription className="text-green-600 dark:text-green-400">
										Comparación del texto antes y después de la corrección
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="p-4 rounded-lg border border-green-200 bg-white/60 dark:bg-slate-800/60 dark:border-green-800">
										<p className="text-base leading-relaxed whitespace-pre-wrap">{correctedText}</p>
									</div>
									<div className="flex gap-2 mt-4">
										<Button
											onClick={() => copyToClipboard(correctedText)}
											variant="outline"
											size="sm"
											className="flex gap-2 items-center text-green-700 bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400">
											<Copy className="w-4 h-4" />
											Copiar Corregido
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
