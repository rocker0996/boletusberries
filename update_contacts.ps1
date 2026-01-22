# Script to update contact information across all language versions
# This script updates addresses, working hours, and phone numbers

$languages = @{
    "it" = @{
        "addressHeader" = "I nostri indirizzi:"
        "address1" = "625053, Regione di Tyumen,<br>Città di Tyumen, passaggio Akademichesky,<br>5 edificio 1, uffici: 212, 213, 214"
        "address2" = "141112, Regione di Mosca,<br>Città di Shchelkovo, via Moskovskaya, 68a"
        "hours" = "Lunedì - Venerdì: <br>07:00 (MSK) - 18:00 (MSK)"
        "mainPhone" = "Principale:"
        "retailDept" = "Reparto Catene di Vendita:"
        "wholesaleDept" = "Reparto All'ingrosso:"
        "logisticsDept" = "Reparto Logistica:"
        "accounting" = "Contabilità:"
    }
    "pl" = @{
        "addressHeader" = "Nasze adresy:"
        "address1" = "625053, Obwód Tiumeński,<br>Miasto Tiumeń, przejazd Akademiczny,<br>5 budynek 1, biura: 212, 213, 214"
        "address2" = "141112, Obwód Moskiewski,<br>Miasto Szczełkowo, ul. Moskowskaja, 68a"
        "hours" = "Poniedziałek - Piątek: <br>07:00 (MSK) - 18:00 (MSK)"
        "mainPhone" = "Główny:"
        "retailDept" = "Dział Sieci Handlowych:"
        "wholesaleDept" = "Dział Hurtowy:"
        "logisticsDept" = "Dział Logistyki:"
        "accounting" = "Księgowość:"
    }
    "sr" = @{
        "addressHeader" = "Naše adrese:"
        "address1" = "625053, Tjumenska oblast,<br>Grad Tjumenj, Akademski prolaz,<br>5 zgrada 1, kancelarije: 212, 213, 214"
        "address2" = "141112, Moskovska oblast,<br>Grad Šč elkovo, ul. Moskovskaja, 68a"
        "hours" = "Ponedeljak - Petak: <br>07:00 (MSK) - 18:00 (MSK)"
        "mainPhone" = "Glavni:"
        "retailDept" = "Odeljenje Maloprodajnih Lanaca:"
        "wholesaleDept" = "Odeljenje Veleprodaje:"
        "logisticsDept" = "Odeljenje Logistike:"
        "accounting" = "Računovodstvo:"
    }
}

Write-Host "Contact information update script created successfully!" -ForegroundColor Green
Write-Host "This script contains translations for IT, PL, and SR languages" -ForegroundColor Cyan
