param (
    [Parameter(Mandatory=$false)]
    [int]$numberOfImagesToGenerate = 1
)

# Define the path where you want to save the images
$path = "./userImages"

# Make sure the directory exists
if (!(Test-Path -path $path)) {
    New-Item -ItemType Directory -Force -Path $path
}

# Loop $count times
for ($i=1; $i -le $numberOfImagesToGenerate; $i++) {
    # Generate a random number
    $randomNumber = Get-Random

    # Define the URL
    $url = "https://picsum.photos/200/200?random=$randomNumber"

    # Define the filename
    $filename = Join-Path -Path $path -ChildPath ("image{0}.jpg" -f $i)

    # Download the image
    Invoke-WebRequest -Uri $url -OutFile $filename
}
