param([Parameter(Mandatory=$true)][string]$InputFile)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$ttsInput = Get-Content -LiteralPath $InputFile -Raw -Encoding UTF8 | ConvertFrom-Json
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  if ($ttsInput.voice) { $speaker.SelectVoice($ttsInput.voice) }
  else {
    $languagePrefix = switch -Regex ($ttsInput.language) {
      '^English' { 'en'; break }
      '^(Hindi|Hinglish)' { 'hi'; break }
      '^Tamil' { 'ta'; break }
      '^Telugu' { 'te'; break }
      '^[a-z]{2}(-[A-Z]{2})?$' { $ttsInput.language.Substring(0,2); break }
      default { throw 'Set an installed voice name in config/channel.json for this language, import narration, or use ElevenLabs.' }
    }
    $voice = $speaker.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.Name.StartsWith($languagePrefix) } | Select-Object -First 1
    if (-not $voice) { throw "No installed $languagePrefix voice. Install a compatible Windows voice, import narration, or use ElevenLabs." }
    $speaker.SelectVoice($voice.VoiceInfo.Name)
  }
  $speaker.SetOutputToWaveFile($ttsInput.output)
  $speaker.Speak($ttsInput.text)
} finally { $speaker.Dispose() }
