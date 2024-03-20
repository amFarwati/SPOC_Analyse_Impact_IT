create database if not exists opsian;
use opsian;
CREATE USER if not exists 'numuser'@'%' IDENTIFIED WITH mysql_native_password BY 'spocBDD';
ALTER USER 'numuser'@'%' IDENTIFIED WITH mysql_native_password BY 'spocBDD';
FLUSH PRIVILEGES;

drop table if exists Composant_M;
drop table if exists Critere_M;
drop table if exists EtapeACV_M;
drop table if exists NomComposant_M;
drop table if exists Source_M;
drop table if exists Item_U;
drop table if exists Push_U;
drop table if exists User_U;
drop table if exists Reference_M;
drop table if exists Type_M;
-- opsian.Critere_M definition

CREATE TABLE `Critere_M` (
  `idCritere` int unsigned NOT NULL AUTO_INCREMENT,
  `critere` varchar(255) NOT NULL,
  `description` varchar(400) NOT NULL,
  `unite` varchar(255) NOT NULL,
  PRIMARY KEY (`idCritere`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.EtapeACV_M definition

CREATE TABLE `EtapeACV_M` (
  `idEtapeACV` int unsigned NOT NULL AUTO_INCREMENT,
  `etapeACV` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idEtapeACV`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.NomComposant_M definition

CREATE TABLE `NomComposant_M` (
  `idNomComposant` int unsigned NOT NULL AUTO_INCREMENT,
  `nomComposant` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idNomComposant`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Source_M definition

CREATE TABLE `Source_M` (
  `idSource` int unsigned NOT NULL AUTO_INCREMENT,
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idSource`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Type_M definition

CREATE TABLE `Type_M` (
  `idType` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `dureeVie` varchar(255) DEFAULT NULL,
  `cout` json DEFAULT NULL,
  PRIMARY KEY (`idType`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.User_U definition

CREATE TABLE `User_U` (
  `idUser` int unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `email_hash` varchar(60) DEFAULT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `auth_token` varchar(60) DEFAULT NULL,
  `liste_organisme` json DEFAULT NULL,
  `image_profile` blob,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Composant_M definition

CREATE TABLE `Composant_M` (
  `idComposant` int unsigned NOT NULL AUTO_INCREMENT,
  `idNomComposant` int unsigned NOT NULL,
  `idEtapeACV` int unsigned NOT NULL,
  `idType` int unsigned NOT NULL,
  `idCritere` int unsigned NOT NULL,
  `idSource` int unsigned DEFAULT NULL,
  `valeur` double unsigned NOT NULL,
  PRIMARY KEY (`idComposant`),
  KEY `fkNomComposant_Composant` (`idNomComposant`),
  KEY `fkEtapeACV_Composant` (`idEtapeACV`),
  KEY `fkNomCritere_Composant` (`idCritere`),
  KEY `fkSource_Composant` (`idSource`),
  KEY `fkType_Composant` (`idType`),
  CONSTRAINT `fkEtapeACV_Composant` FOREIGN KEY (`idEtapeACV`) REFERENCES `EtapeACV_M` (`idEtapeACV`),
  CONSTRAINT `fkNomComposant_Composant` FOREIGN KEY (`idNomComposant`) REFERENCES `NomComposant_M` (`idNomComposant`),
  CONSTRAINT `fkNomCritere_Composant` FOREIGN KEY (`idCritere`) REFERENCES `Critere_M` (`idCritere`),
  CONSTRAINT `fkSource_Composant` FOREIGN KEY (`idSource`) REFERENCES `Source_M` (`idSource`),
  CONSTRAINT `fkType_Composant` FOREIGN KEY (`idType`) REFERENCES `Type_M` (`idType`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Push_U definition

CREATE TABLE `Push_U` (
  `idPush` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `inventaire` tinyint(1) DEFAULT NULL,
  `cout` json DEFAULT NULL,
  PRIMARY KEY (`idPush`),
  KEY `fkUser_Push` (`idUser`),
  CONSTRAINT `fkUser_Push` FOREIGN KEY (`idUser`) REFERENCES `User_U` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Reference_M definition

CREATE TABLE `Reference_M` (
  `idReference` int unsigned NOT NULL AUTO_INCREMENT,
  `nomReference` varchar(255) DEFAULT NULL,
  `idType` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idReference`),
  KEY `fkType_Reference` (`idType`),
  CONSTRAINT `fkType_Reference` FOREIGN KEY (`idType`) REFERENCES `Type_M` (`idType`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- opsian.Item_U definition

CREATE TABLE `Item_U` (
  `idItem` int unsigned NOT NULL AUTO_INCREMENT,
  `nomReference` varchar(255) DEFAULT NULL,
  `idReference` int unsigned DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `idPush` int unsigned DEFAULT NULL,
  `quantite` int DEFAULT '1',
  PRIMARY KEY (`idItem`),
  KEY `fkPush_Item` (`idPush`),
  KEY `fkReference_Item` (`idReference`),
  CONSTRAINT `fkPush_Item` FOREIGN KEY (`idPush`) REFERENCES `Push_U` (`idPush`),
  CONSTRAINT `fkReference_Item` FOREIGN KEY (`idReference`) REFERENCES `Reference_M` (`idReference`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO opsian.Critere_M (critere,description,unite) VALUES
	 ('Climate change','Greenhouse gases (GHG) are gaseous components which absorb the infrared radiation emitted by the earth''s surface 1 and thus contribute to the greenhouse effect.','kg CO2 eq'),
	 ('Particulate matter and respiratory inorganics','The presence of small-diameter fine particles in the air - especially those with a diameter of less than 10 microns - represents a human health problem, since their inhalation can cause respiratory and cardiovascular problems.','Disease incidence'),
	 ('Ionising radiation','Corresponds to the effects of radioactivity. This impact corresponds to the radioactive waste resulting from the production of nuclear electricity.','kBq U-235 eq'),
	 ('Acidification','Air acidification is linked to emissions of nitrogen oxides, sulfur oxides, ammonia and hydrochloric acid. These pollutants turn into acids in the presence of moisture, and their fallout can damage ecosystems as well as buildings. ','mol H+ eq'),
	 ('Resource use (minerals and metals)','Industrial exploitation leads to a decrease in available resources whose reserves are limited. This indicator assesses the amount of mineral and metallic resources extracted from nature as if they were antimony.','kg Sb eq');


INSERT INTO opsian.EtapeACV_M (etapeACV) VALUES
	 ('FABRICATION'),
	 ('DISTRIBUTION'),
	 ('UTILISATION'),
	 ('FIN_DE_VIE');


INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Access floor'),
	 ('Acoustic flocking'),
	 ('Actuator'),
	 ('Aggregation WDM (Wavelength Division Multiplexing)'),
	 ('Aggregation router'),
	 ('Air conditioning group 0.8 MW'),
	 ('Air insulated switchgear envelope'),
	 ('Air insulated switchgear module'),
	 ('Alarm'),
	 ('Alimentation externe ordinateur portable');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Alimentation externe smartphone et tablette'),
	 ('Articulated lorry transport Euro 0, 1, 2, 3, 4 mix 40 t total weight, 27 t max payload RER'),
	 ('BBU 2G-5G (BTS, NODEB, ENODEB and GNODEB) one card'),
	 ('Backbone WDM (Wavelength Division Multiplexing)'),
	 ('Backbone network EU-28'),
	 ('Backbone network FR'),
	 ('Ballasted column 400 mm diameter'),
	 ('Barcode scanner'),
	 ('Barrier'),
	 ('Baseboard wood');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Basement wall'),
	 ('Bituminous primer'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Blade server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  1 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  1 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  1 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  4 HDD  2 RAM, 16 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  4 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  0 SSD: 0 GB each  4 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  1 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  2 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  1 processor low-end  2 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  1 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  1 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  1 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  1 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Blade server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  1 GPU'),
	 ('Blade servers power supply'),
	 ('Buried insulation'),
	 ('Buried pipeline'),
	 ('Cable Cat 6a'),
	 ('Cable Serial bus'),
	 ('Cable multipair');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Cablofil'),
	 ('Capacitive touchscreen LCD display panel, color, high-tech application'),
	 ('Capacitive touchscreen OLED display panel, color'),
	 ('Cash-desk printer'),
	 ('Casing mix of equipment'),
	 ('Central intrusion alarm'),
	 ('Centralized technical management (CTM)'),
	 ('Collection router'),
	 ('Computer monitor 24 inches, LCD'),
	 ('Computer monitor 28 inches, LCD');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Computer monitor 39 inches, OLED'),
	 ('Concrete gutter'),
	 ('Concrete slab'),
	 ('Connected device (IoT) Auto - Appliances'),
	 ('Connected device (IoT) Auto - Audio'),
	 ('Connected device (IoT) Auto - Cooking'),
	 ('Connected device (IoT) Auto - Lighting'),
	 ('Connected device (IoT) Auto - Space'),
	 ('Connected device (IoT) Auto - Street lights'),
	 ('Connected device (IoT) Auto - Water heating');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Connected device (IoT) Blinds + windows'),
	 ('Connected device (IoT) Comm building control'),
	 ('Connected device (IoT) Gateway - Bus'),
	 ('Connected device (IoT) Gateway - LE to WiFi'),
	 ('Connected device (IoT) Security - Control'),
	 ('Connected device (IoT) Security - Video'),
	 ('Connected device (IoT) Sensors - Health'),
	 ('Connected device (IoT) Sensors - Industry'),
	 ('Connected device (IoT) Sensors - Res-LE'),
	 ('Connected device (IoT) Sensors - Res-WiFi');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Connected device (IoT) Smart meters'),
	 ('Connected speaker'),
	 ('Connector RJ45'),
	 ('Container ship ocean technology mix 27.500 dwt pay load capacity RER'),
	 ('Copper braiding (grounding)'),
	 ('Copper cable'),
	 ('DSLAM (Digital Subscriber Line Access Multiplexer)'),
	 ('DVD-ROM Drive'),
	 ('Desktop 1 CPU 126 mm² 14 nm lithography, 4 GB RAM, 256 GB SSD, integrated graphic card'),
	 ('Desktop 1 CPU 149.6 mm² 14 nm lithography, 8 GB RAM, 1000 GB HDD, 256 GB SSD, separated graphic card 363 mm² 28 nm lithography');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Desktop 1 CPU 180 mm² 14 nm lithography, 8 GB RAM, 1000 GB HDD, 256 GB SSD, separated graphic card 363 mm² 28 nm lithography'),
	 ('Desktop 1 CPU 192 mm² 14 nm lithography, 16 GB RAM, 2000 GB HDD, 1024 GB SSD, separated graphic card 363 mm² 28 nm lithography'),
	 ('Desktop 1 CPU 192 mm² 14 nm lithography, 16 GB RAM, 2000 GB HDD, 512 GB SSD, separated graphic card 363 mm² 28 nm lithography'),
	 ('Diesel oil combustion in engine, including diesel oil production consumption mix, at consumer 42 MJ/kg net calorific value RER'),
	 ('Diesel oil production mix, at plant RER'),
	 ('Digital price tag - Power unit'),
	 ('Digital price tag - Tag'),
	 ('Digital price tag - Tranceiver'),
	 ('Digital signage display'),
	 ('Dividing wall');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Dividing wall glazed'),
	 ('Docking station'),
	 ('Door glazed'),
	 ('Door one leaf'),
	 ('Door steel'),
	 ('Door wood'),
	 ('Download or upload 1 GB of data, via a fixed-line connection, end-user equipment not included FR'),
	 ('Download or upload 1 GB of data, via a mobile connection, end-user equipment not included FR'),
	 ('Drain'),
	 ('Drinking water water purification treatment production mix, at plant from groundwater RER');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Dual-flow ventilation'),
	 ('Duckboard'),
	 ('Duct'),
	 ('Edging'),
	 ('Electric cabinet'),
	 ('Electric convection heater'),
	 ('Electric panel'),
	 ('Electricity Mix Production mix Low voltage BE'),
	 ('Electricity Mix Production mix Low voltage CN'),
	 ('Electricity Mix Production mix Low voltage DE');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Electricity Mix Production mix Low voltage DK'),
	 ('Electricity Mix Production mix Low voltage FI'),
	 ('Electricity Mix Production mix Low voltage FR'),
	 ('Electricity Mix Production mix Low voltage NL'),
	 ('Electricity Mix Production mix Low voltage UE-27'),
	 ('Electricity Mix Production mix Low voltage UK'),
	 ('Electricity Mix Production mix Low voltage US'),
	 ('Emergency lighting unit'),
	 ('Empty 42U bay'),
	 ('External solid State Drive (SSD) 2,5, TLC, 1024 Go  production mix, at plant CN');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('External solid State Drive (SSD) 2,5, TLC, 2048 Go  production mix, at plant CN'),
	 ('External solid State Drive (SSD) 2,5, TLC, 256 Go  production mix, at plant CN'),
	 ('Extraction tower'),
	 ('False floor'),
	 ('Fan'),
	 ('Feature phone'),
	 ('Fence'),
	 ('Fence and barrier wire mesh'),
	 ('Fire detection station'),
	 ('Firewall');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Fixed-line network at consumer xDSL, FFTx average mix  EU-28'),
	 ('Fixed-line network at consumer xDSL, FFTx average mix  FR'),
	 ('Flexible covering'),
	 ('Flexicooling air conditioning cabinet'),
	 ('Flexicooling air conditioning crate'),
	 ('Frame'),
	 ('Generator 1136 kVA'),
	 ('Girder galvanized steel'),
	 ('Grid curtain wall'),
	 ('Hard disk drive mix of 2.5 and 3.5, mix of aluminium and glass disks');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Home console'),
	 ('IAD (Integrated Access Device) / CPE (Customer Premise Equipment) router'),
	 ('IAD router with ONT/SFP'),
	 ('IAD/CPE cable router'),
	 ('IAD/CPE router without ONT (Optical Network Termination) / SFP (Small Form-factor-Pluggable)'),
	 ('Impacts related to an IT department employee over a day FR'),
	 ('Impacts related to an employee over a day FR'),
	 ('Impacts related to one square meter of IT department office over a year FR'),
	 ('Impermeability'),
	 ('Insulation');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Insulation lining'),
	 ('Integrated tank'),
	 ('Interior light'),
	 ('Landline phone'),
	 ('Laptop 14.5 inches display, 1 CPU 126 mm² 14 nm lithography, 8 GB RAM, 564 GB SSD, integrated graphic card'),
	 ('Laptop 14.5 inches display, 1 CPU 156 mm² 7 nm lithography, 13 GB RAM, 427 GB SSD, integrated graphic card'),
	 ('Laptop 15.6 inches display, 1 CPU 126 mm² 14 nm lithography, 16 GB RAM, 512 GB SSD, separated graphic card 445 mm² 12 nm lithography'),
	 ('Lead battery 300 kVA'),
	 ('Lead battery 33 kVA'),
	 ('Lead battery 60 kVA');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Lift'),
	 ('Light'),
	 ('Light fuel oil at refinery from crude oil, fuel supply production mix, at refinery 0.1 wt.% sulphur EU-27'),
	 ('Light fuel oil combustion in 1 MW boiler consumption mix, at consumer RER'),
	 ('MME (Mobility Management Entity) /SGSN (Serving GPRS support node)'),
	 ('Mobile network at consumer 2G, 3G, 4G, 5G average mix  EU-28'),
	 ('Mobile network at consumer 2G, 3G, 4G, 5G average mix  FR'),
	 ('Motherboard mix of equipment, without processor or RAM'),
	 ('Motion sensor'),
	 ('Nozzle');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('OAN (Optical Access Node) and/or MDF (Main Distribution Frame ) site collection router/switch'),
	 ('OLED display panel, color'),
	 ('OLT (Optical Line Termination)'),
	 ('ONT (external)'),
	 ('Optical fibre – 12 strands'),
	 ('Optical fibre – 144 strands'),
	 ('Optical fibre – 2 strands'),
	 ('Optical fibre – 24 strands'),
	 ('Optical fibre – 288 strands'),
	 ('Optical fibre – 48 strands');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Optical fibre – 576 strands'),
	 ('Optical fibre – 72 strands'),
	 ('Optical fibre – 720 strands'),
	 ('Optical fibre – 96 strands'),
	 ('P-PE-Peering router'),
	 ('Paint'),
	 ('Paper production mix, at plant from virgin fiber'),
	 ('Paper production mix, at plant without deinking, 100% recycled, from waste paper'),
	 ('Passive multiband antenna (1.4m to 2.7m)'),
	 ('Perforated tiles');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Personnal laser printer'),
	 ('Photovoltaic panel mono 300 Wc'),
	 ('Plane technology mix, cargo 68 t payload RER'),
	 ('Portable console'),
	 ('Portal motorized'),
	 ('Post galvanized steel'),
	 ('Power socket'),
	 ('Power supply unit (PSU), computers, rack and mainframe servers input AC 100-240V, output DC 12V'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 101,83 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 122,3 mm² die area, 58 masks, 14 nm photolithography');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 126 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 131 mm² die area, 54 masks, 22 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 149.6 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 174 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 177mm² die area, 54 masks, 22 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 181mm² die area, 54 masks, 22 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 182 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 246 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 246,24mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 260mm² die area, 54 masks, 22 nm photolithography');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 306,18mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 325,44mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 355.52mm² die area, 54 masks, 22 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 456,12mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 485 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 622 mm² die area, 54 masks, 22 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 694 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Processor, DRAM, 2D and 3D NAND type semiconductor silicon substrate, PBGA/TFBGA/VFBGA encapsulation, 82 mm² die area, 58 masks, 14 nm photolithography'),
	 ('Professional laser printer'),
	 ('R134a leakage');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('R410a leakage'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Rack server  1 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  1 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  1 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  1 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  4 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  4 HDD  2 RAM, 4 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Rack server  1 processor low-end  0 SSD: 0 GB each  4 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  1 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  2 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  1 processor low-end  2 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  16 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  2 RAM, 4 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  24 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  48 RAM, 64 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  1 SSD: 1024 GB each  0 HDD  8 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  16 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  2 RAM, 4 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  24 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 16 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  0 GPU');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  48 RAM, 64 GB each  1 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  0 GPU'),
	 ('Rack server  2 processor high-end  4 SSD: 2048 GB each  0 HDD  8 RAM, 16 GB each  1 GPU'),
	 ('Random-access memory, RAM DDR5, 128GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 16GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 2GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 32GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 4GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 64GB production mix, at plant CN'),
	 ('Random-access memory, RAM DDR5, 8GB production mix, at plant CN');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Refrigerant production mix'),
	 ('Retaining wall'),
	 ('Retention reservoir'),
	 ('Ribbon'),
	 ('Road'),
	 ('SP-GW (Serving/PDN-Gateway)/GGSN (Gateway GPRS Support Node)'),
	 ('Search for an information with a search engine, consulting 2 pages of results, with a fixed-line connection, 50% desktop computer, 50% laptop computer FR'),
	 ('Search for an information with a search engine, consulting 2 pages of results, with a mobile connection, 15% tablet, 85% smartphone FR'),
	 ('Security Gateway 4G/5G'),
	 ('Self-contained emergency lighting unit');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Set top box'),
	 ('Set up a audioconference audio only, between 2 persons, with a fixed-line connection, laptop FR'),
	 ('Set up a audioconference audio only, between 2 persons, with a mobile connection, smartphone FR'),
	 ('Set up a audioconference audio only, between 20 persons, with a fixed-line connection, laptop FR'),
	 ('Set up a audioconference audio only, between 20 persons, with a mobile connection, smartphone FR'),
	 ('Set up a webconference between 2 persons, with a fixed-line connection, laptop FR'),
	 ('Set up a webconference between 2 persons, with a mobile connection, smartphone FR'),
	 ('Set up a webconference between 20 persons, with a fixed-line connection, laptop FR'),
	 ('Set up a webconference between 20 persons, with a mobile connection, smartphone FR'),
	 ('Shaft fan');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Siphon'),
	 ('Smartphone 6.57 inches display OLED, 1 CPU 101.66 mm² 8 nm lithography, 7 GB RAM, 160 GB SSD'),
	 ('Smartphone 6.59 inches display LCD, 1 CPU 101.66 mm² 12 nm lithography, 6 GB RAM, 128 GB SSD'),
	 ('Smartphone 6.72 inches display OLED, 1 CPU 101.66 mm² 7 nm lithography, 11 GB RAM, 341 GB SSD'),
	 ('Smoke detector'),
	 ('Solid State Drive (SSD) 2,5, MLC, 1024 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, MLC, 2048 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, MLC, 256 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, QLC, 1024 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, QLC, 2048 Go  production mix, at plant CN');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Solid State Drive (SSD) 2,5, QLC, 256 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, SLC, 1024 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, SLC, 2048 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, SLC, 256 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, TLC, 1024 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, TLC, 2048 Go  production mix, at plant CN'),
	 ('Solid State Drive (SSD) 2,5, TLC, 256 Go  production mix, at plant CN'),
	 ('Stairs concrete'),
	 ('Stairs galvanized steel'),
	 ('Storage bay  24 disks - HDD');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Storage bay  24 disks - MLC, 1024 GB'),
	 ('Storage bay  24 disks - MLC, 2048 GB'),
	 ('Storage bay  24 disks - MLC, 256 GB'),
	 ('Storage bay  24 disks - QLC, 1024 GB'),
	 ('Storage bay  24 disks - QLC, 2048 GB'),
	 ('Storage bay  24 disks - QLC, 256 GB'),
	 ('Storage bay  24 disks - SLC, 1024 GB'),
	 ('Storage bay  24 disks - SLC, 2048 GB'),
	 ('Storage bay  24 disks - SLC, 256 GB'),
	 ('Storage bay  24 disks - TLC, 1024 GB');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Storage bay  24 disks - TLC, 2048 GB'),
	 ('Storage bay  24 disks - TLC, 256 GB'),
	 ('Storage bay  48 disks - HDD'),
	 ('Storage bay  48 disks - MLC, 1024 GB'),
	 ('Storage bay  48 disks - MLC, 2048 GB'),
	 ('Storage bay  48 disks - MLC, 256 GB'),
	 ('Storage bay  48 disks - QLC, 1024 GB'),
	 ('Storage bay  48 disks - QLC, 2048 GB'),
	 ('Storage bay  48 disks - QLC, 256 GB'),
	 ('Storage bay  48 disks - SLC, 1024 GB');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Storage bay  48 disks - SLC, 2048 GB'),
	 ('Storage bay  48 disks - SLC, 256 GB'),
	 ('Storage bay  48 disks - TLC, 1024 GB'),
	 ('Storage bay  48 disks - TLC, 2048 GB'),
	 ('Storage bay  48 disks - TLC, 256 GB'),
	 ('Store in the cloud 1 GB of data, for 1 year, via a fixed-line connection, end-user equipment not included FR'),
	 ('Store in the cloud 1 GB of data, for 1 year, via a mobile connection, end-user equipment not included FR'),
	 ('Store in the cloud 1 GB of data, for 10 year, via a fixed-line connection, end-user equipment not included FR'),
	 ('Store in the cloud 1 GB of data, for 10 year, via a mobile connection, end-user equipment not included FR'),
	 ('Switch');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Switch/Router  12 ports per U  1 processors  48 GB RAM'),
	 ('Switch/Router  12 ports per U  2 processors  256 GB RAM'),
	 ('Switch/Router  16 ports per U  1 processors  512 GB RAM'),
	 ('Switch/Router  16 ports per U  1 processors  8 GB RAM'),
	 ('Switch/Router  24 ports per U  1 processors  2 GB RAM'),
	 ('Switch/Router  24 ports per U  1 processors  4 GB RAM'),
	 ('Switch/Router  24 ports per U  1 processors  512 GB RAM'),
	 ('Switch/Router  40 ports per U  1 processors  512 GB RAM'),
	 ('Switch/Router  48 ports per U  1 processors  16 GB RAM'),
	 ('Switch/Router  48 ports per U  1 processors  2 GB RAM');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Switch/Router  48 ports per U  1 processors  24 GB RAM'),
	 ('Switch/Router  48 ports per U  1 processors  4 GB RAM'),
	 ('Switch/Router  48 ports per U  1 processors  512 GB RAM'),
	 ('Switch/Router  64 ports per U  1 processors  16 GB RAM'),
	 ('Switch/Router  72 ports per U  1 processors  16 GB RAM'),
	 ('Switch/Router  72 ports per U  1 processors  4 GB RAM'),
	 ('Switch/Router  72 ports per U  1 processors  8 GB RAM'),
	 ('Switch/Router  8 ports per U  1 processors  32 GB RAM'),
	 ('Switch/Router  8 ports per U  1 processors  512 GB RAM'),
	 ('Switch/Router  8 ports per U  1 processors  8 GB RAM');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Switch/Router  8 ports per U  2 processors  32 GB RAM'),
	 ('TFT LCD display panel, color'),
	 ('Tablet 10.2 inches display LCD, 1 CPU 125 mm² 16 nm lithography, 4 GB RAM, 32 GB SSD'),
	 ('Tablet 10.3 inches display LCD, 1 CPU 125 mm² 16 nm lithography, 4 GB RAM, 256 GB SSD'),
	 ('Tablet 11.1 inches display LCD, 1 CPU 83,27 mm² 7 nm lithography, 6 GB RAM, 512 GB SSD'),
	 ('Television 45 inches, LCD'),
	 ('Television 53 inches, OLED'),
	 ('Television 68 inches, OLED'),
	 ('Tiling'),
	 ('Toner');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Train for freight transport technology mix electricity RER'),
	 ('Transformer 1250 kVA'),
	 ('Typical datacenter FR'),
	 ('Typical datacenter, architecture FR'),
	 ('Typical datacenter, non-IT equipment FR'),
	 ('USB key 128 GB capacity TLC'),
	 ('USB key 16 GB capacity TLC'),
	 ('USB key 32 GB capacity TLC'),
	 ('Under slab'),
	 ('Under-tile waterproofing system - SEL');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Under-tile waterproofing system - SPEC'),
	 ('Uninterruptible power supply (UPS) 300 kVA'),
	 ('Uninterruptible power supply (UPS) 33 KTL'),
	 ('Uninterruptible power supply (UPS) 60 KTL'),
	 ('Variable Refrigerant Volume (VRV), external unit'),
	 ('Variable Refrigerant Volume (VRV), internal unit'),
	 ('Video card, 1070 g, 302 cm² PWB, 251 mm² die, 75 mask layers, 7 nm lithography'),
	 ('Video card, 1280 g, 310 cm² PWB, 545 mm² die, 64 mask layers, 12 nm lithography'),
	 ('Video card, 1280 g, 310 cm² PWB, 754 mm² die, 64 mask layers, 12 nm lithography'),
	 ('Video card, 1370 g, 271 cm² PWB, 392 mm² die, 70 mask layers, 8 nm lithography');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Video card, 1520 g, 320 cm² PWB, 520 mm² die, 75 mask layers, 7 nm lithography'),
	 ('Video card, 1530 g, 319 cm² PWB, 628 mm² die, 70 mask layers, 8 nm lithography'),
	 ('Video card, 2040 g, 259 cm² PWB, 445 mm² die, 64 mask layers, 12 nm lithography'),
	 ('Video card, 298 g, 197 cm² PWB, 123 mm² die, 58 mask layers, 14 nm lithography'),
	 ('Video card, 501 g, 162 cm² PWB, 103 mm² die, 58 mask layers, 14 nm lithography'),
	 ('Video card, 590 g, 280 cm² PWB, 232 mm² die, 58 mask layers, 14 nm lithography'),
	 ('Video card, 814 g, 299 cm² PWB, 314 mm² die, 55 mask layers, 16 nm lithography'),
	 ('Video card, 865 g, 311 cm² PWB, 495 mm² die, 58 mask layers, 14 nm lithography'),
	 ('Video card, 875 g, 280 cm² PWB, 232 mm² die, 64 mask layers, 12 nm lithography'),
	 ('Video card, 898 g, 333 cm² PWB, 314 mm² die, 55 mask layers, 16 nm lithography');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Video card, 898 g, 333 cm² PWB, 471 mm² die, 55 mask layers, 16 nm lithography'),
	 ('Video card, 940 g, 337 cm² PWB, 232 mm² die, 58 mask layers, 14 nm lithography'),
	 ('Video card, 962 g, 316 cm² PWB, 158 mm² die, 75 mask layers, 7 nm lithography'),
	 ('Wafer substrat silicium 20 masques Chine'),
	 ('Wafer substrat silicium 20 masques EU-28'),
	 ('Wafer substrat silicium 20 masques FR'),
	 ('Wafer substrat silicium 20 masques TW'),
	 ('Wafer substrat silicium 29 masques, 130 nm photolithography Chine'),
	 ('Wafer substrat silicium 29 masques, 130 nm photolithography EU-28'),
	 ('Wafer substrat silicium 29 masques, 130 nm photolithography FR');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wafer substrat silicium 29 masques, 130 nm photolithography TW'),
	 ('Wafer substrat silicium 33 masques, 90 nm photolithography Chine'),
	 ('Wafer substrat silicium 33 masques, 90 nm photolithography EU-28'),
	 ('Wafer substrat silicium 33 masques, 90 nm photolithography FR'),
	 ('Wafer substrat silicium 33 masques, 90 nm photolithography TW'),
	 ('Wafer substrat silicium 40 masques Chine'),
	 ('Wafer substrat silicium 40 masques EU-28'),
	 ('Wafer substrat silicium 40 masques FR'),
	 ('Wafer substrat silicium 40 masques TW'),
	 ('Wafer substrat silicium 42 masques, 45 nm photolithography Chine');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wafer substrat silicium 42 masques, 45 nm photolithography EU-28'),
	 ('Wafer substrat silicium 42 masques, 45 nm photolithography FR'),
	 ('Wafer substrat silicium 42 masques, 45 nm photolithography TW'),
	 ('Wafer substrat silicium 50 masques, 28 nm photolithography Chine'),
	 ('Wafer substrat silicium 50 masques, 28 nm photolithography EU-28'),
	 ('Wafer substrat silicium 50 masques, 28 nm photolithography FR'),
	 ('Wafer substrat silicium 50 masques, 28 nm photolithography TW'),
	 ('Wafer substrat silicium 54 masques, 22 nm photolithography Chine'),
	 ('Wafer substrat silicium 54 masques, 22 nm photolithography EU-28'),
	 ('Wafer substrat silicium 54 masques, 22 nm photolithography FR');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wafer substrat silicium 54 masques, 22 nm photolithography TW'),
	 ('Wafer substrat silicium 55 masques, 16 nm photolithography Chine'),
	 ('Wafer substrat silicium 55 masques, 16 nm photolithography EU-28'),
	 ('Wafer substrat silicium 55 masques, 16 nm photolithography FR'),
	 ('Wafer substrat silicium 55 masques, 16 nm photolithography TW'),
	 ('Wafer substrat silicium 58 masques, 14 nm photolithography Chine'),
	 ('Wafer substrat silicium 58 masques, 14 nm photolithography EU-28'),
	 ('Wafer substrat silicium 58 masques, 14 nm photolithography FR'),
	 ('Wafer substrat silicium 58 masques, 14 nm photolithography TW'),
	 ('Wafer substrat silicium 64 masques, 12 nm EUV lithography Chine');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wafer substrat silicium 64 masques, 12 nm EUV lithography EU-28'),
	 ('Wafer substrat silicium 64 masques, 12 nm EUV lithography FR'),
	 ('Wafer substrat silicium 64 masques, 12 nm EUV lithography TW'),
	 ('Wafer substrat silicium 70 masques, 5 ou 8 nm EUV lithography Chine'),
	 ('Wafer substrat silicium 70 masques, 5 ou 8 nm EUV lithography EU-28'),
	 ('Wafer substrat silicium 70 masques, 5 ou 8 nm EUV lithography FR'),
	 ('Wafer substrat silicium 70 masques, 5 ou 8 nm EUV lithography TW'),
	 ('Wafer substrat silicium 75 masques, 7 nm EUV lithography Chine'),
	 ('Wafer substrat silicium 75 masques, 7 nm EUV lithography EU-28'),
	 ('Wafer substrat silicium 75 masques, 7 nm EUV lithography FR');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wafer substrat silicium 75 masques, 7 nm EUV lithography TW'),
	 ('Wall, floor, ceiling coating wood'),
	 ('Wastewater network'),
	 ('Watch 1 hour of streaming video 1080p, 60 fps, via a fixed-line connection, 82% television, 18% laptop FR'),
	 ('Watch 1 hour of streaming video 1080p, 60 fps, via a mobile connection, 67% tablet, 33% smartphone FR'),
	 ('Watch 1 hour of streaming video 4k, 60 fps, via a fixed-line connection, 82% television, 18% laptop FR'),
	 ('Watch 1 hour of streaming video 4k, 60 fps, via a mobile connection, 67% tablet, 33% smartphone FR'),
	 ('Watch 1 hour of streaming video 720p, 30 fps, via a fixed-line connection, 82% television, 18% laptop FR'),
	 ('Watch 1 hour of streaming video 720p, 30 fps, via a mobile connection, 67% tablet, 33% smartphone FR'),
	 ('WiFi hotspot');
INSERT INTO opsian.NomComposant_M (nomComposant) VALUES
	 ('Wireless barcode scanner'),
	 ('Write, send and read an email 1MB size, to five recipient, with a fixed-line connection, 50% desktop computer, 50% laptop computer, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 1MB size, to five recipient, with a mobile connection, 15% tablet, 85% smartphone, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 1MB size, to one recipient, with a fixed-line connection, 50% desktop computer, 50% laptop computer, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 1MB size, to one recipient, with a mobile connection, 15% tablet, 85% smartphone, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 7kB size, to five recipient, with a fixed-line connection, 50% desktop computer, 50% laptop computer, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 7kB size, to five recipient, with a mobile connection, 15% tablet, 85% smartphone, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 7kB size, to one recipient, with a fixed-line connection, 50% desktop computer, 50% laptop computer, 10-year storage with 3 redundancies on the sender and receiver sides FR'),
	 ('Write, send and read an email 7kB size, to one recipient, with a mobile connection, 15% tablet, 85% smartphone, 10-year storage with 3 redundancies on the sender and receiver sides FR');


INSERT INTO opsian.Source_M (source) VALUES
	 ('Base IMPACTS®2.02'),
	 ('NegaOctet V1.00'),
	 ('negaoctet');

INSERT INTO opsian.Type_M (`type`,dureeVie,cout) VALUES
	 ('blade-server--28','7','{"1": {"1": {"cout": 2935.5392}, "2": {"cout": 0.0000917808}, "3": {"cout": 445.2614}, "4": {"cout": 16.62232}, "5": {"cout": 0.06377608}}, "2": {"1": {"cout": 54.7419852343155}, "2": {"cout": 0.00000147349236213371}, "3": {"cout": 0.974698151287876}, "4": {"cout": 0.240761987817827}, "5": {"cout": 0.0000020782000488724}}, "3": {"1": {"cout": 234.62784}, "2": {"cout": 0.000052475904}, "3": {"cout": 6067.5264}, "4": {"cout": 1.3497408}, "5": {"cout": 0.000110754432}}, "4": {"1": {"cout": 9.51974}, "2": {"cout": 0.0000004881976}, "3": {"cout": 0.721642}, "4": {"cout": 0.1452076}, "5": {"cout": 0.00001782262}}}'),
	 ('blade-servers-power-supply-1','7','{"1": {"1": {"cout": 253}, "2": {"cout": 0.0000106}, "3": {"cout": 4610}, "4": {"cout": 1.87}, "5": {"cout": 0.0237}}, "2": {"1": {"cout": 71.03450331008}, "2": {"cout": 0.00000191203876928}, "3": {"cout": 1.26479152624128}, "4": {"cout": 0.3124184873344}, "5": {"cout": 0.0000026967218601728}}, "3": {"1": {"cout": 0}, "2": {"cout": 0}, "3": {"cout": 0}, "4": {"cout": 0}, "5": {"cout": 0}}, "4": {"1": {"cout": 18}, "2": {"cout": 0.00000112}, "3": {"cout": 1.45}, "4": {"cout": 0.483}, "5": {"cout": 0.00000676}}}'),
	 ('cash-desk-printer-1','8.106475756','{"1": {"1": {"cout": 29.4}, "2": {"cout": 0.00000108}, "3": {"cout": 66.7}, "4": {"cout": 0.175}, "5": {"cout": 0.00472}}, "2": {"1": {"cout": 1.3690184508}, "2": {"cout": 0.00000025033927776}, "3": {"cout": 0.0028072718388}, "4": {"cout": 0.047653961784}, "5": {"cout": 0.000000048538916712}}, "3": {"1": {"cout": 0}, "2": {"cout": 0}, "3": {"cout": 0}, "4": {"cout": 0}, "5": {"cout": 0}}, "4": {"1": {"cout": 4.25}, "2": {"cout": 0.000000222}, "3": {"cout": 0.325}, "4": {"cout": 0.0383}, "5": {"cout": 0.0000134}}}'),
	 ('computer-monitor-1','5.088141394','{"1": {"1": {"cout": 59}, "2": {"cout": 0.00000247}, "3": {"cout": 143}, "4": {"cout": 0.394}, "5": {"cout": 0.0117}}, "2": {"1": {"cout": 1.2732828948}, "2": {"cout": 0.00000023283303456}, "3": {"cout": 0.0026109591228}, "4": {"cout": 0.044321516904}, "5": {"cout": 0.000000045144586872}}, "3": {"1": {"cout": 2.61144}, "2": {"cout": 0.000000584064}, "3": {"cout": 67.5324}, "4": {"cout": 0.0150228}, "5": {"cout": 0.000001232712}}, "4": {"1": {"cout": 3.87}, "2": {"cout": 0.000000149}, "3": {"cout": 0.216}, "4": {"cout": 0.0221}, "5": {"cout": 0.000012}}}'),
	 ('computer-monitor-2','5.088141394','{"1": {"1": {"cout": 67.2}, "2": {"cout": 0.00000277}, "3": {"cout": 166}, "4": {"cout": 0.45}, "5": {"cout": 0.0141}}, "2": {"1": {"cout": 1.3817831916}, "2": {"cout": 0.00000025267344352}, "3": {"cout": 0.0028334468676}, "4": {"cout": 0.048098287768}, "5": {"cout": 0.000000048991494024}}, "3": {"1": {"cout": 4.21848}, "2": {"cout": 0.000000943488}, "3": {"cout": 109.0908}, "4": {"cout": 0.0242676}, "5": {"cout": 0.000001991304}}, "4": {"1": {"cout": 3.87}, "2": {"cout": 0.000000149}, "3": {"cout": 0.216}, "4": {"cout": 0.0221}, "5": {"cout": 0.000012}}}'),
	 ('computer-monitor-3','5.088141394','{"1": {"1": {"cout": 459}, "2": {"cout": 0.0000113}, "3": {"cout": 212}, "4": {"cout": 2.11}, "5": {"cout": 0.0116}}, "2": {"1": {"cout": 2.4189183816}, "2": {"cout": 0.00000044232441152}, "3": {"cout": 0.0049601679576}, "4": {"cout": 0.084199773968}, "5": {"cout": 0.000000085763400624}}, "3": {"1": {"cout": 6.696}, "2": {"cout": 0.0000014976}, "3": {"cout": 173.16}, "4": {"cout": 0.03852}, "5": {"cout": 0.0000031608}}, "4": {"1": {"cout": 9.34}, "2": {"cout": 0.000000358}, "3": {"cout": 0.514}, "4": {"cout": 0.0546}, "5": {"cout": 0.0000314}}}'),
	 ('connected-speaker-1','5.088141394','{"1": {"1": {"cout": 19.5}, "2": {"cout": 0.000000691}, "3": {"cout": 36.9}, "4": {"cout": 0.125}, "5": {"cout": 0.00273}}, "2": {"1": {"cout": 0.2616771864}, "2": {"cout": 0.00000004785039808}, "3": {"cout": 0.0005365880904}, "4": {"cout": 0.009108682672}, "5": {"cout": 0.000000009277834896}}, "3": {"1": {"cout": 1.54008}, "2": {"cout": 0.000000344448}, "3": {"cout": 39.8268}, "4": {"cout": 0.0088596}, "5": {"cout": 0.000000726984}}, "4": {"1": {"cout": 0.733}, "2": {"cout": 0.0000000346}, "3": {"cout": 0.0545}, "4": {"cout": 0.00768}, "5": {"cout": 0.0000025}}}'),
	 ('desktop-1','5','{"1": {"1": {"cout": 89.5}, "2": {"cout": 0.00000305}, "3": {"cout": 163}, "4": {"cout": 0.545}, "5": {"cout": 0.00652}}, "2": {"1": {"cout": 0.9126789672}, "2": {"cout": 0.00000016689285184}, "3": {"cout": 0.0018715145592}, "4": {"cout": 0.031769307856}, "5": {"cout": 0.000000032359277808}}, "3": {"1": {"cout": 5.15592}, "2": {"cout": 0.000001153152}, "3": {"cout": 133.3332}, "4": {"cout": 0.0296604}, "5": {"cout": 0.000002433816}}, "4": {"1": {"cout": 6.61}, "2": {"cout": 0.000000363}, "3": {"cout": 0.625}, "4": {"cout": 0.0966}, "5": {"cout": 0.0000135}}}'),
	 ('desktop-2','5','{"1": {"1": {"cout": 202}, "2": {"cout": 0.00000774}, "3": {"cout": 551}, "4": {"cout": 1.28}, "5": {"cout": 0.0197}}, "2": {"1": {"cout": 1.8476962308}, "2": {"cout": 0.00000033787049376}, "3": {"cout": 0.0037888354188}, "4": {"cout": 0.064316186184}, "5": {"cout": 0.000000065510565912}}, "3": {"1": {"cout": 5.82552}, "2": {"cout": 0.000001302912}, "3": {"cout": 150.6492}, "4": {"cout": 0.0335124}, "5": {"cout": 0.000002749896}}, "4": {"1": {"cout": 6.61}, "2": {"cout": 0.000000363}, "3": {"cout": 0.625}, "4": {"cout": 0.0966}, "5": {"cout": 0.0000135}}}'),
	 ('desktop-4','5','{"1": {"1": {"cout": 318}, "2": {"cout": 0.0000116}, "3": {"cout": 776}, "4": {"cout": 1.98}, "5": {"cout": 0.0262}}, "2": {"1": {"cout": 3.446480016}, "2": {"cout": 0.0000006302247552}, "3": {"cout": 0.007067257776}, "4": {"cout": 0.11996801568}, "5": {"cout": 0.00000012219587424}}, "3": {"1": {"cout": 6.42816}, "2": {"cout": 0.000001437696}, "3": {"cout": 166.2336}, "4": {"cout": 0.0369792}, "5": {"cout": 0.000003034368}}, "4": {"1": {"cout": 6.61}, "2": {"cout": 0.000000363}, "3": {"cout": 0.625}, "4": {"cout": 0.0966}, "5": {"cout": 0.0000135}}}');
INSERT INTO opsian.Type_M (`type`,dureeVie,cout) VALUES
	 ('desktop-5','5','{"1": {"1": {"cout": 425}, "2": {"cout": 0.0000151}, "3": {"cout": 2010}, "4": {"cout": 2.58}, "5": {"cout": 0.0267}}, "2": {"1": {"cout": 4.850601504}, "2": {"cout": 0.0000008869829888}, "3": {"cout": 0.009946510944}, "4": {"cout": 0.16884387392}, "5": {"cout": 0.00000017197937856}}, "3": {"1": {"cout": 9.77616}, "2": {"cout": 0.000002186496}, "3": {"cout": 252.8136}, "4": {"cout": 0.0562392}, "5": {"cout": 0.000004614768}}, "4": {"1": {"cout": 6.61}, "2": {"cout": 0.000000363}, "3": {"cout": 0.625}, "4": {"cout": 0.0966}, "5": {"cout": 0.0000135}}}'),
	 ('docking-station-1','8','{"1": {"1": {"cout": 23.2}, "2": {"cout": 0.000000935}, "3": {"cout": 35}, "4": {"cout": 0.165}, "5": {"cout": 0.00433}}, "2": {"1": {"cout": 0.28656843096}, "2": {"cout": 0.000000052402021312}, "3": {"cout": 0.00058762939656}, "4": {"cout": 0.0099751183408}, "5": {"cout": 0.0000000101603606544}}, "3": {"1": {"cout": 0.0857088}, "2": {"cout": 0.00000001916928}, "3": {"cout": 2.216448}, "4": {"cout": 0.000493056}, "5": {"cout": 0.00000004045824}}, "4": {"1": {"cout": 1.3}, "2": {"cout": 0.0000000724}, "3": {"cout": 0.0958}, "4": {"cout": 0.0275}, "5": {"cout": 0.00000118}}}'),
	 ('external-solid-state-drive-ssd-2','10','{"1": {"1": {"cout": 93.6}, "2": {"cout": 0.00000288}, "3": {"cout": 6.78}, "4": {"cout": 0.522}, "5": {"cout": 0.000882}}, "2": {"1": {"cout": 0.02058314454}, "2": {"cout": 0.000000003763842288}, "3": {"cout": 0.00004220723394}, "4": {"cout": 0.0007164756492}, "5": {"cout": 0.0000000007297809156}}, "3": {"1": {"cout": 0.0247752}, "2": {"cout": 0.00000000554112}, "3": {"cout": 0.640692}, "4": {"cout": 0.000142524}, "5": {"cout": 0.00000001169496}}, "4": {"1": {"cout": 0.0909}, "2": {"cout": 0.00000000487}, "3": {"cout": 0.00663}, "4": {"cout": 0.00179}, "5": {"cout": 0.0000000759}}}'),
	 ('firewall-1','7','{"1": {"1": {"cout": 286}, "2": {"cout": 0.00000996}, "3": {"cout": 265}, "4": {"cout": 1.81}, "5": {"cout": 0.041}}, "2": {"1": {"cout": 61.60023333921}, "2": {"cout": 0.000001658096120235}, "3": {"cout": 1.09681140166236}, "4": {"cout": 0.2709254069853}, "5": {"cout": 0.0000023385634881186}}, "3": {"1": {"cout": 58.65696}, "2": {"cout": 0.000013118976}, "3": {"cout": 1516.8816}, "4": {"cout": 0.3374352}, "5": {"cout": 0.000027688608}}, "4": {"1": {"cout": 11.6}, "2": {"cout": 0.000000606}, "3": {"cout": 0.874}, "4": {"cout": 0.12}, "5": {"cout": 0.0000298}}}'),
	 ('iad/cpe-router-without-ont-optical-network-termination-/-sfp-small-form-factor-pluggable-1','8','{"1": {"1": {"cout": 34.2}, "2": {"cout": 0.0000013}, "3": {"cout": 138}, "4": {"cout": 0.231}, "5": {"cout": 0.00385}}, "2": {"1": {"cout": 0.25082715672}, "2": {"cout": 0.000000045866357184}, "3": {"cout": 0.00051433931592}, "4": {"cout": 0.0087310055856}, "5": {"cout": 0.0000000088931441808}}, "3": {"1": {"cout": 5.49072}, "2": {"cout": 0.000001228032}, "3": {"cout": 141.9912}, "4": {"cout": 0.0315864}, "5": {"cout": 0.000002591856}}, "4": {"1": {"cout": 1.3}, "2": {"cout": 0.000000068}, "3": {"cout": 0.0746}, "4": {"cout": 0.0173}, "5": {"cout": 0.00000427}}}'),
	 ('laptop-1','7','{"1": {"1": {"cout": 161}, "2": {"cout": 0.00000565}, "3": {"cout": 75}, "4": {"cout": 0.996}, "5": {"cout": 0.00932}}, "2": {"1": {"cout": 12.3187364062}, "2": {"cout": 0.0000003752485207976}, "3": {"cout": 0.03354794679024}, "4": {"cout": 0.06237333373464}, "5": {"cout": 0.00000048279850007152}}, "3": {"1": {"cout": 0.9950256}, "2": {"cout": 0.00000022254336}, "3": {"cout": 25.731576}, "4": {"cout": 0.005724072}, "5": {"cout": 0.00000046969488}}, "4": {"1": {"cout": 37.7}, "2": {"cout": 0.00000118}, "3": {"cout": 11.4}, "4": {"cout": 0.236}, "5": {"cout": 0.0000104}}}'),
	 ('laptop-2','7','{"1": {"1": {"cout": 149}, "2": {"cout": 0.00000523}, "3": {"cout": 69.1}, "4": {"cout": 0.913}, "5": {"cout": 0.00913}}, "2": {"1": {"cout": 11.0082325332}, "2": {"cout": 0.0000003353284653936}, "3": {"cout": 0.02997901628064}, "4": {"cout": 0.05573787269904}, "5": {"cout": 0.00000043143695751072}}, "3": {"1": {"cout": 1.8735408}, "2": {"cout": 0.00000041902848}, "3": {"cout": 48.450168}, "4": {"cout": 0.010777896}, "5": {"cout": 0.00000088439184}}, "4": {"1": {"cout": 1.46}, "2": {"cout": 0.0000000775}, "3": {"cout": 0.166}, "4": {"cout": 0.0219}, "5": {"cout": 0.00000388}}}'),
	 ('laptop-3','7','{"1": {"1": {"cout": 308}, "2": {"cout": 0.0000101}, "3": {"cout": 98.1}, "4": {"cout": 1.78}, "5": {"cout": 0.012}}, "2": {"1": {"cout": 18.41257941565}, "2": {"cout": 0.0000005608767784262}, "3": {"cout": 0.05014347365988}, "4": {"cout": 0.09322822755018}, "5": {"cout": 0.00000072162967297924}}, "3": {"1": {"cout": 1.948536}, "2": {"cout": 0.0000004358016}, "3": {"cout": 50.38956}, "4": {"cout": 0.01120932}, "5": {"cout": 0.0000009197928}}, "4": {"1": {"cout": 1.48}, "2": {"cout": 0.0000000774}, "3": {"cout": 0.187}, "4": {"cout": 0.0222}, "5": {"cout": 0.00000383}}}'),
	 ('passive-multiband-antenna-1.4m-to-2.7m-1','8.331666727','{"1": {"1": {"cout": 636}, "2": {"cout": 0.0000304}, "3": {"cout": 1360}, "4": {"cout": 5.49}, "5": {"cout": 0.0321}}, "2": {"1": {"cout": 16.402691928}, "2": {"cout": 0.0000029994030016}, "3": {"cout": 0.033634912008}, "4": {"cout": 0.57095888944}, "5": {"cout": 0.00000058156184592}}, "3": {"1": {"cout": 0}, "2": {"cout": 0}, "3": {"cout": 0}, "4": {"cout": 0}, "5": {"cout": 0}}, "4": {"1": {"cout": 55.9}, "2": {"cout": 0.00000169}, "3": {"cout": 1.93}, "4": {"cout": 0.264}, "5": {"cout": 0.0000664}}}'),
	 ('power-supply-unit-psu-1','8.331666727','{"1": {"1": {"cout": 20.8}, "2": {"cout": 0.000000872}, "3": {"cout": 379}, "4": {"cout": 0.154}, "5": {"cout": 0.00195}}, "2": {"1": {"cout": 0.31911852}, "2": {"cout": 0.000000058354144}, "3": {"cout": 0.00065437572}, "4": {"cout": 0.0111081496}, "5": {"cout": 0.0000000113144328}}, "3": {"1": {"cout": 0}, "2": {"cout": 0}, "3": {"cout": 0}, "4": {"cout": 0}, "5": {"cout": 0}}, "4": {"1": {"cout": 1.06}, "2": {"cout": 0.0000000606}, "3": {"cout": 0.101}, "4": {"cout": 0.0227}, "5": {"cout": 0.0000012}}}');
INSERT INTO opsian.Type_M (`type`,dureeVie,cout) VALUES
	 ('professional-laser-printer-1','8.106475756','{"1": {"1": {"cout": 155}, "2": {"cout": 0.00000679}, "3": {"cout": 585}, "4": {"cout": 0.998}, "5": {"cout": 0.0115}}, "2": {"1": {"cout": 5.10589632}, "2": {"cout": 0.000000933666304}, "3": {"cout": 0.01047001152}, "4": {"cout": 0.1777303936}, "5": {"cout": 0.0000001810309248}}, "3": {"1": {"cout": 4.75416}, "2": {"cout": 0.000001063296}, "3": {"cout": 122.9436}, "4": {"cout": 0.0273492}, "5": {"cout": 0.000002244168}}, "4": {"1": {"cout": 17.3}, "2": {"cout": 0.000000935}, "3": {"cout": 1.31}, "4": {"cout": 0.182}, "5": {"cout": 0.0000634}}}'),
	 ('smartphone-1','2','{"1": {"1": {"cout": 61}, "2": {"cout": 0.00000209}, "3": {"cout": 17.7}, "4": {"cout": 0.374}, "5": {"cout": 0.00323}}, "2": {"1": {"cout": 3.7376875727784}, "2": {"cout": 0.00000011950745010768}, "3": {"cout": 0.0246169223390664}, "4": {"cout": 0.020053666113804}, "5": {"cout": 0.0000001450867695858}}, "3": {"1": {"cout": 0.2202984}, "2": {"cout": 0.00000004927104}, "3": {"cout": 5.696964}, "4": {"cout": 0.001267308}, "5": {"cout": 0.00000010399032}}, "4": {"1": {"cout": 0.248}, "2": {"cout": 0.000000012}, "3": {"cout": 0.0405}, "4": {"cout": 0.00431}, "5": {"cout": 0.000000123}}}'),
	 ('smartphone-2','2','{"1": {"1": {"cout": 71.6}, "2": {"cout": 0.00000235}, "3": {"cout": 12.5}, "4": {"cout": 0.42}, "5": {"cout": 0.00263}}, "2": {"1": {"cout": 1.5356390802888}, "2": {"cout": 0.00000004909996012176}, "3": {"cout": 0.0101139293331048}, "4": {"cout": 0.008239103132028}, "5": {"cout": 0.0000000596092929306}}, "3": {"1": {"cout": 0.261144}, "2": {"cout": 0.0000000584064}, "3": {"cout": 6.75324}, "4": {"cout": 0.00150228}, "5": {"cout": 0.0000001232712}}, "4": {"1": {"cout": 0.245}, "2": {"cout": 0.0000000119}, "3": {"cout": 0.0394}, "4": {"cout": 0.00428}, "5": {"cout": 0.000000123}}}'),
	 ('smartphone-3','2','{"1": {"1": {"cout": 44.1}, "2": {"cout": 0.00000151}, "3": {"cout": 12.2}, "4": {"cout": 0.268}, "5": {"cout": 0.00263}}, "2": {"1": {"cout": 1.5308100265772}, "2": {"cout": 0.00000004894555773144}, "3": {"cout": 0.0100821245238812}, "4": {"cout": 0.008213194002682}, "5": {"cout": 0.0000000594218423239}}, "3": {"1": {"cout": 0.3053376}, "2": {"cout": 0.00000006829056}, "3": {"cout": 7.896096}, "4": {"cout": 0.001756512}, "5": {"cout": 0.00000014413248}}, "4": {"1": {"cout": 0.244}, "2": {"cout": 0.0000000118}, "3": {"cout": 0.039}, "4": {"cout": 0.00428}, "5": {"cout": 0.000000123}}}'),
	 ('storage-bay--25','8.331666727','{"1": {"1": {"cout": 6812.37}, "2": {"cout": 0.000208473}, "3": {"cout": 344.9241}, "4": {"cout": 37.7805}, "5": {"cout": 0.04239102}}, "2": {"1": {"cout": 2.08752768}, "2": {"cout": 0.000000107275728}, "3": {"cout": 0.0050945616}, "4": {"cout": 0.0132127248}, "5": {"cout": 0.000000082010016}}, "3": {"1": {"cout": 168.9320448}, "2": {"cout": 0.00003778265088}, "3": {"cout": 4368.619008}, "4": {"cout": 0.971813376}, "5": {"cout": 0.00007974319104}}, "4": {"1": {"cout": 31.776}, "2": {"cout": 0.0000015837}, "3": {"cout": 2.6142}, "4": {"cout": 0.21975}, "5": {"cout": 0.0001097256}}}'),
	 ('switch/router--1','8','{"1": {"1": {"cout": 283.1298}, "2": {"cout": 0.0000098922}, "3": {"cout": 534.5868}, "4": {"cout": 1.79083}, "5": {"cout": 0.02818336}}, "2": {"1": {"cout": 26.1969476654181}, "2": {"cout": 0.000000705144362795464}, "3": {"cout": 0.466444838446633}, "4": {"cout": 0.115217399728717}, "5": {"cout": 0.000000994529111166615}}, "3": {"1": {"cout": 123.179616}, "2": {"cout": 0.0000275498496}, "3": {"cout": 3185.45136}, "4": {"cout": 0.70861392}, "5": {"cout": 0.0000581460768}}, "4": {"1": {"cout": 4.89989}, "2": {"cout": 0.0000002591474}, "3": {"cout": 0.389088}, "4": {"cout": 0.0862924}, "5": {"cout": 0.00000732568}}}'),
	 ('switch/router--11','8','{"1": {"1": {"cout": 206.4898}, "2": {"cout": 0.0000074122}, "3": {"cout": 531.4188}, "4": {"cout": 1.34283}, "5": {"cout": 0.02523936}}, "2": {"1": {"cout": 24.4033264568386}, "2": {"cout": 0.000000656865383871144}, "3": {"cout": 0.434508852409041}, "4": {"cout": 0.107328832923524}, "5": {"cout": 0.000000926436884197252}}, "3": {"1": {"cout": 111.448224}, "2": {"cout": 0.0000249260544}, "3": {"cout": 2882.07504}, "4": {"cout": 0.64112688}, "5": {"cout": 0.0000526083552}}, "4": {"1": {"cout": 4.39269}, "2": {"cout": 0.0000002317874}, "3": {"cout": 0.352448}, "4": {"cout": 0.0749964}, "5": {"cout": 0.00000714648}}}'),
	 ('switch/router--12','8','{"1": {"1": {"cout": 225.6498}, "2": {"cout": 0.0000080322}, "3": {"cout": 532.2108}, "4": {"cout": 1.45483}, "5": {"cout": 0.02597536}}, "2": {"1": {"cout": 24.8517317589835}, "2": {"cout": 0.000000668935128602224}, "3": {"cout": 0.442492848918439}, "4": {"cout": 0.109300974624822}, "5": {"cout": 0.000000943459940939592}}, "3": {"1": {"cout": 142.5364128}, "2": {"cout": 0.00003187911168}, "3": {"cout": 3686.022288}, "4": {"cout": 0.819967536}, "5": {"cout": 0.00006728331744}}, "4": {"1": {"cout": 4.51949}, "2": {"cout": 0.0000002386274}, "3": {"cout": 0.361608}, "4": {"cout": 0.0778204}, "5": {"cout": 0.00000719128}}}'),
	 ('switch/router--13','8','{"1": {"1": {"cout": 1394.4098}, "2": {"cout": 0.0000458522}, "3": {"cout": 580.5228}, "4": {"cout": 8.28683}, "5": {"cout": 0.07087136}}, "2": {"1": {"cout": 52.2044551898211}, "2": {"cout": 0.0000014051895571981}, "3": {"cout": 0.929516635991722}, "4": {"cout": 0.229601618404024}, "5": {"cout": 0.00000198186640222238}}, "3": {"1": {"cout": 296.217648}, "2": {"cout": 0.0000662508288}, "3": {"cout": 7660.25208}, "4": {"cout": 1.70404776}, "5": {"cout": 0.0001398274704}}, "4": {"1": {"cout": 12.25429}, "2": {"cout": 0.0000006558674}, "3": {"cout": 0.920368}, "4": {"cout": 0.2500844}, "5": {"cout": 0.00000992408}}}'),
	 ('switch/router--5','8','{"1": {"1": {"cout": 172.9598}, "2": {"cout": 0.0000063272}, "3": {"cout": 530.0328}, "4": {"cout": 1.14683}, "5": {"cout": 0.02395136}}, "2": {"1": {"cout": 23.618617178085}, "2": {"cout": 0.000000635743330591754}, "3": {"cout": 0.420536858517594}, "4": {"cout": 0.103877584946251}, "5": {"cout": 0.000000896646534898155}}, "3": {"1": {"cout": 24.81189408}, "2": {"cout": 0.000005549326848}, "3": {"cout": 641.6409168}, "4": {"cout": 0.1427350896}, "5": {"cout": 0.000011712281184}}, "4": {"1": {"cout": 4.17079}, "2": {"cout": 0.0000002198174}, "3": {"cout": 0.336418}, "4": {"cout": 0.0700544}, "5": {"cout": 0.00000706808}}}');
INSERT INTO opsian.Type_M (`type`,dureeVie,cout) VALUES
	 ('switch/router--6','8','{"1": {"1": {"cout": 177.7498}, "2": {"cout": 0.0000064822}, "3": {"cout": 530.2308}, "4": {"cout": 1.17483}, "5": {"cout": 0.02413536}}, "2": {"1": {"cout": 23.7307185036213}, "2": {"cout": 0.000000638760766774524}, "3": {"cout": 0.422532857644944}, "4": {"cout": 0.104370620371576}, "5": {"cout": 0.00000090090229908374}}, "3": {"1": {"cout": 46.3389984}, "2": {"cout": 0.00001036399104}, "3": {"cout": 1198.336464}, "4": {"cout": 0.266573808}, "5": {"cout": 0.00002187400032}}, "4": {"1": {"cout": 4.20249}, "2": {"cout": 0.0000002215274}, "3": {"cout": 0.338708}, "4": {"cout": 0.0707604}, "5": {"cout": 0.00000707928}}}'),
	 ('switch/router--9','8','{"1": {"1": {"cout": 172.9598}, "2": {"cout": 0.0000063272}, "3": {"cout": 530.0328}, "4": {"cout": 1.14683}, "5": {"cout": 0.02395136}}, "2": {"1": {"cout": 23.618617178085}, "2": {"cout": 0.000000635743330591754}, "3": {"cout": 0.420536858517594}, "4": {"cout": 0.103877584946251}, "5": {"cout": 0.000000896646534898155}}, "3": {"1": {"cout": 29.68042176}, "2": {"cout": 0.000006638201856}, "3": {"cout": 767.5420896}, "4": {"cout": 0.1707422112}, "5": {"cout": 0.000014010435648}}, "4": {"1": {"cout": 4.17079}, "2": {"cout": 0.0000002198174}, "3": {"cout": 0.336418}, "4": {"cout": 0.0700544}, "5": {"cout": 0.00000706808}}}'),
	 ('tablet-1','5','{"1": {"1": {"cout": 55.6}, "2": {"cout": 0.00000203}, "3": {"cout": 30.2}, "4": {"cout": 0.36}, "5": {"cout": 0.00437}}, "2": {"1": {"cout": 2.0813221496996}, "2": {"cout": 0.00000006654743022792}, "3": {"cout": 0.0137078727753716}, "4": {"cout": 0.011166834748126}, "5": {"cout": 0.0000000807912114877}}, "3": {"1": {"cout": 1.245456}, "2": {"cout": 0.0000002785536}, "3": {"cout": 32.20776}, "4": {"cout": 0.00716472}, "5": {"cout": 0.0000005879088}}, "4": {"1": {"cout": 0.36}, "2": {"cout": 0.0000000162}, "3": {"cout": 0.0607}, "4": {"cout": 0.00475}, "5": {"cout": 0.000000183}}}'),
	 ('tablet-2','5','{"1": {"1": {"cout": 65.2}, "2": {"cout": 0.00000234}, "3": {"cout": 32}, "4": {"cout": 0.418}, "5": {"cout": 0.00443}}, "2": {"1": {"cout": 4.0032855269164}, "2": {"cout": 0.00000012799958157528}, "3": {"cout": 0.0263661868463644}, "4": {"cout": 0.021478668227834}, "5": {"cout": 0.0000001553965529543}}, "3": {"1": {"cout": 1.245456}, "2": {"cout": 0.0000002785536}, "3": {"cout": 32.20776}, "4": {"cout": 0.00716472}, "5": {"cout": 0.0000005879088}}, "4": {"1": {"cout": 0.326}, "2": {"cout": 0.0000000143}, "3": {"cout": 0.0656}, "4": {"cout": 0.00475}, "5": {"cout": 0.000000125}}}'),
	 ('tablet-3','5','{"1": {"1": {"cout": 48}, "2": {"cout": 0.00000182}, "3": {"cout": 33.5}, "4": {"cout": 0.325}, "5": {"cout": 0.00456}}, "2": {"1": {"cout": 4.2157638902268}, "2": {"cout": 0.00000013479328674936}, "3": {"cout": 0.0277655984522028}, "4": {"cout": 0.022618669919058}, "5": {"cout": 0.0000001636443796491}}, "3": {"1": {"cout": 1.245456}, "2": {"cout": 0.0000002785536}, "3": {"cout": 32.20776}, "4": {"cout": 0.00716472}, "5": {"cout": 0.0000005879088}}, "4": {"1": {"cout": 0.404}, "2": {"cout": 0.0000000176}, "3": {"cout": 0.0736}, "4": {"cout": 0.00498}, "5": {"cout": 0.00000019}}}'),
	 ('television-1','8','{"1": {"1": {"cout": 177}, "2": {"cout": 0.00000692}, "3": {"cout": 1010}, "4": {"cout": 1.17}, "5": {"cout": 0.0429}}, "2": {"1": {"cout": 3.318832608}, "2": {"cout": 0.0000006068830976}, "3": {"cout": 0.006805507488}, "4": {"cout": 0.11552475584}, "5": {"cout": 0.00000011767010112}}, "3": {"1": {"cout": 8.37}, "2": {"cout": 0.000001872}, "3": {"cout": 216.45}, "4": {"cout": 0.04815}, "5": {"cout": 0.000003951}}, "4": {"1": {"cout": 12.3}, "2": {"cout": 0.000000414}, "3": {"cout": 0.526}, "4": {"cout": 0.0467}, "5": {"cout": 0.0000429}}}'),
	 ('television-2','8','{"1": {"1": {"cout": 819}, "2": {"cout": 0.0000201}, "3": {"cout": 822}, "4": {"cout": 3.74}, "5": {"cout": 0.0191}}, "2": {"1": {"cout": 2.9071697172}, "2": {"cout": 0.00000053160625184}, "3": {"cout": 0.0059613628092}, "4": {"cout": 0.101195242856}, "5": {"cout": 0.000000103074482808}}, "3": {"1": {"cout": 16.94088}, "2": {"cout": 0.000003788928}, "3": {"cout": 438.0948}, "4": {"cout": 0.0974556}, "5": {"cout": 0.000007996824}}, "4": {"1": {"cout": 9.63}, "2": {"cout": 0.000000372}, "3": {"cout": 0.538}, "4": {"cout": 0.0557}, "5": {"cout": 0.0000316}}}'),
	 ('television-3','8','{"1": {"1": {"cout": 1290}, "2": {"cout": 0.0000307}, "3": {"cout": 843}, "4": {"cout": 5.78}, "5": {"cout": 0.0192}}, "2": {"1": {"cout": 2.9103609024}, "2": {"cout": 0.00000053218979328}, "3": {"cout": 0.0059679065664}, "4": {"cout": 0.101306324352}, "5": {"cout": 0.000000103187627136}}, "3": {"1": {"cout": 20.95848}, "2": {"cout": 0.000004687488}, "3": {"cout": 541.9908}, "4": {"cout": 0.1205676}, "5": {"cout": 0.000009893304}}, "4": {"1": {"cout": 9.64}, "2": {"cout": 0.000000372}, "3": {"cout": 0.539}, "4": {"cout": 0.0557}, "5": {"cout": 0.0000316}}}'),
	 ('usb-key-1','2','{"1": {"1": {"cout": 2.91}, "2": {"cout": 0.0000000983}, "3": {"cout": 1.68}, "4": {"cout": 0.0178}, "5": {"cout": 0.000243}}, "2": {"1": {"cout": 0.004244276316}, "2": {"cout": 0.0000000007761101152}, "3": {"cout": 0.000008703197076}, "4": {"cout": 0.00014773838968}, "5": {"cout": 0.00000000015048195624}}, "3": {"1": {"cout": 0.010044}, "2": {"cout": 0.0000000022464}, "3": {"cout": 0.25974}, "4": {"cout": 0.00005778}, "5": {"cout": 0.0000000047412}}, "4": {"1": {"cout": 0.02}, "2": {"cout": 0.00000000105}, "3": {"cout": 0.00137}, "4": {"cout": 0.000487}, "5": {"cout": 0.00000000271}}}'),
	 ('usb-key-2','2','{"1": {"1": {"cout": 3.46}, "2": {"cout": 0.000000111}, "3": {"cout": 1.03}, "4": {"cout": 0.0201}, "5": {"cout": 0.000147}}, "2": {"1": {"cout": 0.0025976247528}, "2": {"cout": 0.00000000047500273216}, "3": {"cout": 0.0000053266183608}, "4": {"cout": 0.000090420337744}, "5": {"cout": 0.000000000092099482992}}, "3": {"1": {"cout": 0.010044}, "2": {"cout": 0.0000000022464}, "3": {"cout": 0.25974}, "4": {"cout": 0.00005778}, "5": {"cout": 0.0000000047412}}, "4": {"1": {"cout": 0.0122}, "2": {"cout": 0.000000000644}, "3": {"cout": 0.000835}, "4": {"cout": 0.000297}, "5": {"cout": 0.00000000166}}}');
INSERT INTO opsian.Type_M (`type`,dureeVie,cout) VALUES
	 ('wifi-hotspot-1','2','{"1": {"1": {"cout": 31}, "2": {"cout": 0.00000111}, "3": {"cout": 35.2}, "4": {"cout": 0.199}, "5": {"cout": 0.00506}}, "2": {"1": {"cout": 0.20136378612}, "2": {"cout": 0.000000036821464864}, "3": {"cout": 0.00041291107932}, "4": {"cout": 0.0070092423976}, "5": {"cout": 0.0000000071394070968}}, "3": {"1": {"cout": 0}, "2": {"cout": 0}, "3": {"cout": 0}, "4": {"cout": 0}, "5": {"cout": 0}}, "4": {"1": {"cout": 0.679}, "2": {"cout": 0.0000000356}, "3": {"cout": 0.0497}, "4": {"cout": 0.00727}, "5": {"cout": 0.000002}}}');


INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (160,1,13,1,3,93.6),
	 (160,1,13,5,3,0.000882),
	 (160,1,13,4,3,0.522),
	 (160,1,13,3,3,6.78),
	 (160,1,13,2,3,0.00000288),
	 (160,2,13,1,3,0.02058314454),
	 (160,2,13,5,3,0.0000000007297809),
	 (160,2,13,4,3,0.0007164756492),
	 (160,2,13,3,3,0.00004220723394),
	 (160,2,13,2,3,0.0000000037638423);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (160,3,13,1,3,0.0247752),
	 (160,3,13,5,3,0.00000001169496),
	 (160,3,13,4,3,0.000142524),
	 (160,3,13,3,3,0.640692),
	 (160,3,13,2,3,0.00000000554112),
	 (160,4,13,1,3,0.0909),
	 (160,4,13,5,3,0.0000000759),
	 (160,4,13,4,3,0.00179),
	 (160,4,13,3,3,0.00663),
	 (160,4,13,2,3,0.00000000487);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (238,1,20,1,3,20.8),
	 (238,1,20,5,3,0.00195),
	 (238,1,20,4,3,0.154),
	 (238,1,20,3,3,379.0),
	 (238,1,20,2,3,0.000000872),
	 (238,2,20,1,3,0.31911852),
	 (238,2,20,5,3,0.0000000113144328),
	 (238,2,20,4,3,0.0111081496),
	 (238,2,20,3,3,0.00065437572),
	 (238,2,20,2,3,0.000000058354144);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (238,4,20,1,3,1.06),
	 (238,4,20,5,3,0.0000012),
	 (238,4,20,4,3,0.0227),
	 (238,4,20,3,3,0.101),
	 (238,4,20,2,3,0.0000000606),
	 (196,1,16,1,3,161.0),
	 (196,1,16,5,3,0.00932),
	 (196,1,16,4,3,0.996),
	 (196,1,16,3,3,75.0),
	 (196,1,16,2,3,0.00000565);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (196,2,16,1,3,12.3187364062),
	 (196,2,16,5,3,0.0000004827985001),
	 (196,2,16,4,3,0.06237333373464),
	 (196,2,16,3,3,0.03354794679024),
	 (196,2,16,2,3,0.0000003752485208),
	 (196,3,16,1,3,0.9950256),
	 (196,3,16,5,3,0.00000046969488),
	 (196,3,16,4,3,0.005724072),
	 (196,3,16,3,3,25.731576),
	 (196,3,16,2,3,0.00000022254336);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (196,4,16,1,3,37.7),
	 (196,4,16,5,3,0.0000104),
	 (196,4,16,4,3,0.236),
	 (196,4,16,3,3,11.4),
	 (196,4,16,2,3,0.00000118),
	 (195,1,17,1,3,149.0),
	 (195,1,17,5,3,0.00913),
	 (195,1,17,4,3,0.913),
	 (195,1,17,3,3,69.1),
	 (195,1,17,2,3,0.00000523);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (195,2,17,1,3,11.0082325332),
	 (195,2,17,5,3,0.0000004314369575),
	 (195,2,17,4,3,0.05573787269904),
	 (195,2,17,3,3,0.02997901628064),
	 (195,2,17,2,3,0.0000003353284654),
	 (195,3,17,1,3,1.8735408),
	 (195,3,17,5,3,0.00000088439184),
	 (195,3,17,4,3,0.010777896),
	 (195,3,17,3,3,48.450168),
	 (195,3,17,2,3,0.00000041902848);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (195,4,17,1,3,1.46),
	 (195,4,17,5,3,0.00000388),
	 (195,4,17,4,3,0.0219),
	 (195,4,17,3,3,0.166),
	 (195,4,17,2,3,0.0000000775),
	 (197,1,18,1,3,308.0),
	 (197,1,18,5,3,0.012),
	 (197,1,18,4,3,1.78),
	 (197,1,18,3,3,98.1),
	 (197,1,18,2,3,0.0000101);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (197,2,18,1,3,18.41257941565),
	 (197,2,18,5,3,0.000000721629673),
	 (197,2,18,4,3,0.09322822755018),
	 (197,2,18,3,3,0.05014347365988),
	 (197,2,18,2,3,0.0000005608767784),
	 (197,3,18,1,3,1.948536),
	 (197,3,18,5,3,0.0000009197928),
	 (197,3,18,4,3,0.01120932),
	 (197,3,18,3,3,50.38956),
	 (197,3,18,2,3,0.0000004358016);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (197,4,18,1,3,1.48),
	 (197,4,18,5,3,0.00000383),
	 (197,4,18,4,3,0.0222),
	 (197,4,18,3,3,0.187),
	 (197,4,18,2,3,0.0000000774),
	 (413,1,33,1,3,55.6),
	 (413,1,33,5,3,0.00437),
	 (413,1,33,4,3,0.36),
	 (413,1,33,3,3,30.2),
	 (413,1,33,2,3,0.00000203);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (413,2,33,1,3,2.0813221496996),
	 (413,2,33,5,3,0.0000000807912115),
	 (413,2,33,4,3,0.011166834748126),
	 (413,2,33,3,3,0.0137078727753716),
	 (413,2,33,2,3,0.0000000665474302),
	 (413,3,33,1,3,1.245456),
	 (413,3,33,5,3,0.0000005879088),
	 (413,3,33,4,3,0.00716472),
	 (413,3,33,3,3,32.20776),
	 (413,3,33,2,3,0.0000002785536);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (413,4,33,1,3,0.36),
	 (413,4,33,5,3,0.000000183),
	 (413,4,33,4,3,0.00475),
	 (413,4,33,3,3,0.0607),
	 (413,4,33,2,3,0.0000000162),
	 (414,1,34,1,3,65.2),
	 (414,1,34,5,3,0.00443),
	 (414,1,34,4,3,0.418),
	 (414,1,34,3,3,32.0),
	 (414,1,34,2,3,0.00000234);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (414,2,34,1,3,4.0032855269164),
	 (414,2,34,5,3,0.000000155396553),
	 (414,2,34,4,3,0.021478668227834),
	 (414,2,34,3,3,0.0263661868463644),
	 (414,2,34,2,3,0.0000001279995816),
	 (414,3,34,1,3,1.245456),
	 (414,3,34,5,3,0.0000005879088),
	 (414,3,34,4,3,0.00716472),
	 (414,3,34,3,3,32.20776),
	 (414,3,34,2,3,0.0000002785536);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (414,4,34,1,3,0.326),
	 (414,4,34,5,3,0.000000125),
	 (414,4,34,4,3,0.00475),
	 (414,4,34,3,3,0.0656),
	 (414,4,34,2,3,0.0000000143),
	 (415,1,35,1,3,48.0),
	 (415,1,35,5,3,0.00456),
	 (415,1,35,4,3,0.325),
	 (415,1,35,3,3,33.5),
	 (415,1,35,2,3,0.00000182);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (415,2,35,1,3,4.2157638902268),
	 (415,2,35,5,3,0.0000001636443796),
	 (415,2,35,4,3,0.022618669919058),
	 (415,2,35,3,3,0.0277655984522028),
	 (415,2,35,2,3,0.0000001347932867),
	 (415,3,35,1,3,1.245456),
	 (415,3,35,5,3,0.0000005879088),
	 (415,3,35,4,3,0.00716472),
	 (415,3,35,3,3,32.20776),
	 (415,3,35,2,3,0.0000002785536);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (415,4,35,1,3,0.404),
	 (415,4,35,5,3,0.00000019),
	 (415,4,35,4,3,0.00498),
	 (415,4,35,3,3,0.0736),
	 (415,4,35,2,3,0.0000000176),
	 (343,1,22,1,3,61.0),
	 (343,1,22,5,3,0.00323),
	 (343,1,22,4,3,0.374),
	 (343,1,22,3,3,17.7),
	 (343,1,22,2,3,0.00000209);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (343,2,22,1,3,3.7376875727784),
	 (343,2,22,5,3,0.0000001450867696),
	 (343,2,22,4,3,0.020053666113804),
	 (343,2,22,3,3,0.0246169223390664),
	 (343,2,22,2,3,0.0000001195074501),
	 (343,3,22,1,3,0.2202984),
	 (343,3,22,5,3,0.00000010399032),
	 (343,3,22,4,3,0.001267308),
	 (343,3,22,3,3,5.696964),
	 (343,3,22,2,3,0.00000004927104);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (343,4,22,1,3,0.248),
	 (343,4,22,5,3,0.000000123),
	 (343,4,22,4,3,0.00431),
	 (343,4,22,3,3,0.0405),
	 (343,4,22,2,3,0.000000012),
	 (342,1,23,1,3,71.6),
	 (342,1,23,5,3,0.00263),
	 (342,1,23,4,3,0.42),
	 (342,1,23,3,3,12.5),
	 (342,1,23,2,3,0.00000235);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (342,2,23,1,3,1.5356390802888),
	 (342,2,23,5,3,0.0000000596092929),
	 (342,2,23,4,3,0.008239103132028),
	 (342,2,23,3,3,0.0101139293331048),
	 (342,2,23,2,3,0.0000000490999601),
	 (342,3,23,1,3,0.261144),
	 (342,3,23,5,3,0.0000001232712),
	 (342,3,23,4,3,0.00150228),
	 (342,3,23,3,3,6.75324),
	 (342,3,23,2,3,0.0000000584064);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (342,4,23,1,3,0.245),
	 (342,4,23,5,3,0.000000123),
	 (342,4,23,4,3,0.00428),
	 (342,4,23,3,3,0.0394),
	 (342,4,23,2,3,0.0000000119),
	 (344,1,24,1,3,44.1),
	 (344,1,24,5,3,0.00263),
	 (344,1,24,4,3,0.268),
	 (344,1,24,3,3,12.2),
	 (344,1,24,2,3,0.00000151);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (344,2,24,1,3,1.5308100265772),
	 (344,2,24,5,3,0.0000000594218423),
	 (344,2,24,4,3,0.008213194002682),
	 (344,2,24,3,3,0.0100821245238812),
	 (344,2,24,2,3,0.0000000489455577),
	 (344,3,24,1,3,0.3053376),
	 (344,3,24,5,3,0.00000014413248),
	 (344,3,24,4,3,0.001756512),
	 (344,3,24,3,3,7.896096),
	 (344,3,24,2,3,0.00000006829056);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (344,4,24,1,3,0.244),
	 (344,4,24,5,3,0.000000123),
	 (344,4,24,4,3,0.00428),
	 (344,4,24,3,3,0.039),
	 (344,4,24,2,3,0.0000000118),
	 (119,1,8,1,3,89.5),
	 (119,1,8,5,3,0.00652),
	 (119,1,8,4,3,0.545),
	 (119,1,8,3,3,163.0),
	 (119,1,8,2,3,0.00000305);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (119,2,8,1,3,0.9126789672),
	 (119,2,8,5,3,0.0000000323592778),
	 (119,2,8,4,3,0.031769307856),
	 (119,2,8,3,3,0.0018715145592),
	 (119,2,8,2,3,0.0000001668928518),
	 (119,3,8,1,3,5.15592),
	 (119,3,8,5,3,0.000002433816),
	 (119,3,8,4,3,0.0296604),
	 (119,3,8,3,3,133.3332),
	 (119,3,8,2,3,0.000001153152);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (119,4,8,1,3,6.61),
	 (119,4,8,5,3,0.0000135),
	 (119,4,8,4,3,0.0966),
	 (119,4,8,3,3,0.625),
	 (119,4,8,2,3,0.000000363),
	 (120,1,9,1,3,202.0),
	 (120,1,9,5,3,0.0197),
	 (120,1,9,4,3,1.28),
	 (120,1,9,3,3,551.0),
	 (120,1,9,2,3,0.00000774);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (120,2,9,1,3,1.8476962308),
	 (120,2,9,5,3,0.0000000655105659),
	 (120,2,9,4,3,0.064316186184),
	 (120,2,9,3,3,0.0037888354188),
	 (120,2,9,2,3,0.0000003378704938),
	 (120,3,9,1,3,5.82552),
	 (120,3,9,5,3,0.000002749896),
	 (120,3,9,4,3,0.0335124),
	 (120,3,9,3,3,150.6492),
	 (120,3,9,2,3,0.000001302912);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (120,4,9,1,3,6.61),
	 (120,4,9,5,3,0.0000135),
	 (120,4,9,4,3,0.0966),
	 (120,4,9,3,3,0.625),
	 (120,4,9,2,3,0.000000363),
	 (123,1,10,1,3,318.0),
	 (123,1,10,5,3,0.0262),
	 (123,1,10,4,3,1.98),
	 (123,1,10,3,3,776.0),
	 (123,1,10,2,3,0.0000116);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (123,2,10,1,3,3.446480016),
	 (123,2,10,5,3,0.0000001221958742),
	 (123,2,10,4,3,0.11996801568),
	 (123,2,10,3,3,0.007067257776),
	 (123,2,10,2,3,0.0000006302247552),
	 (123,3,10,1,3,6.42816),
	 (123,3,10,5,3,0.000003034368),
	 (123,3,10,4,3,0.0369792),
	 (123,3,10,3,3,166.2336),
	 (123,3,10,2,3,0.000001437696);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (123,4,10,1,3,6.61),
	 (123,4,10,5,3,0.0000135),
	 (123,4,10,4,3,0.0966),
	 (123,4,10,3,3,0.625),
	 (123,4,10,2,3,0.000000363),
	 (122,1,11,1,3,425.0),
	 (122,1,11,5,3,0.0267),
	 (122,1,11,4,3,2.58),
	 (122,1,11,3,3,2010.0),
	 (122,1,11,2,3,0.0000151);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (122,2,11,1,3,4.850601504),
	 (122,2,11,5,3,0.0000001719793786),
	 (122,2,11,4,3,0.16884387392),
	 (122,2,11,3,3,0.009946510944),
	 (122,2,11,2,3,0.0000008869829888),
	 (122,3,11,1,3,9.77616),
	 (122,3,11,5,3,0.000004614768),
	 (122,3,11,4,3,0.0562392),
	 (122,3,11,3,3,252.8136),
	 (122,3,11,2,3,0.000002186496);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (122,4,11,1,3,6.61),
	 (122,4,11,5,3,0.0000135),
	 (122,4,11,4,3,0.0966),
	 (122,4,11,3,3,0.625),
	 (122,4,11,2,3,0.000000363),
	 (89,1,4,1,3,59.0),
	 (89,1,4,5,3,0.0117),
	 (89,1,4,4,3,0.394),
	 (89,1,4,3,3,143.0),
	 (89,1,4,2,3,0.00000247);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (89,2,4,1,3,1.2732828948),
	 (89,2,4,5,3,0.0000000451445869),
	 (89,2,4,4,3,0.044321516904),
	 (89,2,4,3,3,0.0026109591228),
	 (89,2,4,2,3,0.0000002328330346),
	 (89,3,4,1,3,2.61144),
	 (89,3,4,5,3,0.000001232712),
	 (89,3,4,4,3,0.0150228),
	 (89,3,4,3,3,67.5324),
	 (89,3,4,2,3,0.000000584064);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (89,4,4,1,3,3.87),
	 (89,4,4,5,3,0.000012),
	 (89,4,4,4,3,0.0221),
	 (89,4,4,3,3,0.216),
	 (89,4,4,2,3,0.000000149),
	 (90,1,5,1,3,67.2),
	 (90,1,5,5,3,0.0141),
	 (90,1,5,4,3,0.45),
	 (90,1,5,3,3,166.0),
	 (90,1,5,2,3,0.00000277);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (90,2,5,1,3,1.3817831916),
	 (90,2,5,5,3,0.000000048991494),
	 (90,2,5,4,3,0.048098287768),
	 (90,2,5,3,3,0.0028334468676),
	 (90,2,5,2,3,0.0000002526734435),
	 (90,3,5,1,3,4.21848),
	 (90,3,5,5,3,0.000001991304),
	 (90,3,5,4,3,0.0242676),
	 (90,3,5,3,3,109.0908),
	 (90,3,5,2,3,0.000000943488);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (90,4,5,1,3,3.87),
	 (90,4,5,5,3,0.000012),
	 (90,4,5,4,3,0.0221),
	 (90,4,5,3,3,0.216),
	 (90,4,5,2,3,0.000000149),
	 (91,1,6,1,3,459.0),
	 (91,1,6,5,3,0.0116),
	 (91,1,6,4,3,2.11),
	 (91,1,6,3,3,212.0),
	 (91,1,6,2,3,0.0000113);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (91,2,6,1,3,2.4189183816),
	 (91,2,6,5,3,0.0000000857634006),
	 (91,2,6,4,3,0.084199773968),
	 (91,2,6,3,3,0.0049601679576),
	 (91,2,6,2,3,0.0000004423244115),
	 (91,3,6,1,3,6.696),
	 (91,3,6,5,3,0.0000031608),
	 (91,3,6,4,3,0.03852),
	 (91,3,6,3,3,173.16),
	 (91,3,6,2,3,0.0000014976);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (91,4,6,1,3,9.34),
	 (91,4,6,5,3,0.0000314),
	 (91,4,6,4,3,0.0546),
	 (91,4,6,3,3,0.514),
	 (91,4,6,2,3,0.000000358),
	 (416,1,36,1,3,177.0),
	 (416,1,36,5,3,0.0429),
	 (416,1,36,4,3,1.17),
	 (416,1,36,3,3,1010.0),
	 (416,1,36,2,3,0.00000692);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (416,2,36,1,3,3.318832608),
	 (416,2,36,5,3,0.0000001176701011),
	 (416,2,36,4,3,0.11552475584),
	 (416,2,36,3,3,0.006805507488),
	 (416,2,36,2,3,0.0000006068830976),
	 (416,3,36,1,3,8.37),
	 (416,3,36,5,3,0.000003951),
	 (416,3,36,4,3,0.04815),
	 (416,3,36,3,3,216.45),
	 (416,3,36,2,3,0.000001872);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (416,4,36,1,3,12.3),
	 (416,4,36,5,3,0.0000429),
	 (416,4,36,4,3,0.0467),
	 (416,4,36,3,3,0.526),
	 (416,4,36,2,3,0.000000414),
	 (417,1,37,1,3,819.0),
	 (417,1,37,5,3,0.0191),
	 (417,1,37,4,3,3.74),
	 (417,1,37,3,3,822.0),
	 (417,1,37,2,3,0.0000201);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (417,2,37,1,3,2.9071697172),
	 (417,2,37,5,3,0.0000001030744828),
	 (417,2,37,4,3,0.101195242856),
	 (417,2,37,3,3,0.0059613628092),
	 (417,2,37,2,3,0.0000005316062518),
	 (417,3,37,1,3,16.94088),
	 (417,3,37,5,3,0.000007996824),
	 (417,3,37,4,3,0.0974556),
	 (417,3,37,3,3,438.0948),
	 (417,3,37,2,3,0.000003788928);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (417,4,37,1,3,9.63),
	 (417,4,37,5,3,0.0000316),
	 (417,4,37,4,3,0.0557),
	 (417,4,37,3,3,0.538),
	 (417,4,37,2,3,0.000000372),
	 (418,1,38,1,3,1290.0),
	 (418,1,38,5,3,0.0192),
	 (418,1,38,4,3,5.78),
	 (418,1,38,3,3,843.0),
	 (418,1,38,2,3,0.0000307);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (418,2,38,1,3,2.9103609024),
	 (418,2,38,5,3,0.0000001031876271),
	 (418,2,38,4,3,0.101306324352),
	 (418,2,38,3,3,0.0059679065664),
	 (418,2,38,2,3,0.0000005321897933),
	 (418,3,38,1,3,20.95848),
	 (418,3,38,5,3,0.000009893304),
	 (418,3,38,4,3,0.1205676),
	 (418,3,38,3,3,541.9908),
	 (418,3,38,2,3,0.000004687488);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (418,4,38,1,3,9.64),
	 (418,4,38,5,3,0.0000316),
	 (418,4,38,4,3,0.0557),
	 (418,4,38,3,3,0.539),
	 (418,4,38,2,3,0.000000372),
	 (427,1,39,1,3,2.91),
	 (427,1,39,5,3,0.000243),
	 (427,1,39,4,3,0.0178),
	 (427,1,39,3,3,1.68),
	 (427,1,39,2,3,0.0000000983);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (427,2,39,1,3,0.004244276316),
	 (427,2,39,5,3,0.000000000150482),
	 (427,2,39,4,3,0.00014773838968),
	 (427,2,39,3,3,0.000008703197076),
	 (427,2,39,2,3,0.0000000007761101),
	 (427,3,39,1,3,0.010044),
	 (427,3,39,5,3,0.0000000047412),
	 (427,3,39,4,3,0.00005778),
	 (427,3,39,3,3,0.25974),
	 (427,3,39,2,3,0.0000000022464);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (427,4,39,1,3,0.02),
	 (427,4,39,5,3,0.00000000271),
	 (427,4,39,4,3,0.000487),
	 (427,4,39,3,3,0.00137),
	 (427,4,39,2,3,0.00000000105),
	 (428,1,40,1,3,3.46),
	 (428,1,40,5,3,0.000147),
	 (428,1,40,4,3,0.0201),
	 (428,1,40,3,3,1.03),
	 (428,1,40,2,3,0.000000111);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (428,2,40,1,3,0.0025976247528),
	 (428,2,40,5,3,0.0000000000920995),
	 (428,2,40,4,3,0.000090420337744),
	 (428,2,40,3,3,0.0000053266183608),
	 (428,2,40,2,3,0.0000000004750027),
	 (428,3,40,1,3,0.010044),
	 (428,3,40,5,3,0.0000000047412),
	 (428,3,40,4,3,0.00005778),
	 (428,3,40,3,3,0.25974),
	 (428,3,40,2,3,0.0000000022464);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (428,4,40,1,3,0.0122),
	 (428,4,40,5,3,0.00000000166),
	 (428,4,40,4,3,0.000297),
	 (428,4,40,3,3,0.000835),
	 (428,4,40,2,3,0.000000000644),
	 (132,1,12,1,3,23.2),
	 (132,1,12,5,3,0.00433),
	 (132,1,12,4,3,0.165),
	 (132,1,12,3,3,35.0),
	 (132,1,12,2,3,0.000000935);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (132,2,12,1,3,0.28656843096),
	 (132,2,12,5,3,0.0000000101603607),
	 (132,2,12,4,3,0.0099751183408),
	 (132,2,12,3,3,0.00058762939656),
	 (132,2,12,2,3,0.0000000524020213),
	 (132,3,12,1,3,0.0857088),
	 (132,3,12,5,3,0.00000004045824),
	 (132,3,12,4,3,0.000493056),
	 (132,3,12,3,3,2.216448),
	 (132,3,12,2,3,0.00000001916928);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (132,4,12,1,3,1.3),
	 (132,4,12,5,3,0.00000118),
	 (132,4,12,4,3,0.0275),
	 (132,4,12,3,3,0.0958),
	 (132,4,12,2,3,0.0000000724),
	 (112,1,7,1,3,19.5),
	 (112,1,7,5,3,0.00273),
	 (112,1,7,4,3,0.125),
	 (112,1,7,3,3,36.9),
	 (112,1,7,2,3,0.000000691);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (112,2,7,1,3,0.2616771864),
	 (112,2,7,5,3,0.0000000092778349),
	 (112,2,7,4,3,0.009108682672),
	 (112,2,7,3,3,0.0005365880904),
	 (112,2,7,2,3,0.0000000478503981),
	 (112,3,7,1,3,1.54008),
	 (112,3,7,5,3,0.000000726984),
	 (112,3,7,4,3,0.0088596),
	 (112,3,7,3,3,39.8268),
	 (112,3,7,2,3,0.000000344448);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (112,4,7,1,3,0.733),
	 (112,4,7,5,3,0.0000025),
	 (112,4,7,4,3,0.00768),
	 (112,4,7,3,3,0.0545),
	 (112,4,7,2,3,0.0000000346),
	 (259,1,21,1,3,155.0),
	 (259,1,21,5,3,0.0115),
	 (259,1,21,4,3,0.998),
	 (259,1,21,3,3,585.0),
	 (259,1,21,2,3,0.00000679);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (259,2,21,1,3,5.10589632),
	 (259,2,21,5,3,0.0000001810309248),
	 (259,2,21,4,3,0.1777303936),
	 (259,2,21,3,3,0.01047001152),
	 (259,2,21,2,3,0.000000933666304),
	 (259,3,21,1,3,4.75416),
	 (259,3,21,5,3,0.000002244168),
	 (259,3,21,4,3,0.0273492),
	 (259,3,21,3,3,122.9436),
	 (259,3,21,2,3,0.000001063296);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (259,4,21,1,3,17.3),
	 (259,4,21,5,3,0.0000634),
	 (259,4,21,4,3,0.182),
	 (259,4,21,3,3,1.31),
	 (259,4,21,2,3,0.000000935),
	 (84,1,3,1,3,29.4),
	 (84,1,3,5,3,0.00472),
	 (84,1,3,4,3,0.175),
	 (84,1,3,3,3,66.7),
	 (84,1,3,2,3,0.00000108);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (84,2,3,1,3,1.3690184508),
	 (84,2,3,5,3,0.0000000485389167),
	 (84,2,3,4,3,0.047653961784),
	 (84,2,3,3,3,0.0028072718388),
	 (84,2,3,2,3,0.0000002503392778),
	 (84,4,3,1,3,4.25),
	 (84,4,3,5,3,0.0000134),
	 (84,4,3,4,3,0.0383),
	 (84,4,3,3,3,0.325),
	 (84,4,3,2,3,0.000000222);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (510,1,41,1,3,31.0),
	 (510,1,41,5,3,0.00506),
	 (510,1,41,4,3,0.199),
	 (510,1,41,3,3,35.2),
	 (510,1,41,2,3,0.00000111),
	 (510,2,41,1,3,0.20136378612),
	 (510,2,41,5,3,0.0000000071394071),
	 (510,2,41,4,3,0.0070092423976),
	 (510,2,41,3,3,0.00041291107932),
	 (510,2,41,2,3,0.0000000368214649);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (510,4,41,1,3,0.679),
	 (510,4,41,5,3,0.000002),
	 (510,4,41,4,3,0.00727),
	 (510,4,41,3,3,0.0497),
	 (510,4,41,2,3,0.0000000356),
	 (185,1,15,1,3,34.2),
	 (185,1,15,5,3,0.00385),
	 (185,1,15,4,3,0.231),
	 (185,1,15,3,3,138.0),
	 (185,1,15,2,3,0.0000013);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (185,2,15,1,3,0.25082715672),
	 (185,2,15,5,3,0.0000000088931442),
	 (185,2,15,4,3,0.0087310055856),
	 (185,2,15,3,3,0.00051433931592),
	 (185,2,15,2,3,0.0000000458663572),
	 (185,3,15,1,3,5.49072),
	 (185,3,15,5,3,0.000002591856),
	 (185,3,15,4,3,0.0315864),
	 (185,3,15,3,3,141.9912),
	 (185,3,15,2,3,0.000001228032);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (185,4,15,1,3,1.3),
	 (185,4,15,5,3,0.00000427),
	 (185,4,15,4,3,0.0173),
	 (185,4,15,3,3,0.0746),
	 (185,4,15,2,3,0.000000068),
	 (229,1,19,1,3,636.0),
	 (229,1,19,5,3,0.0321),
	 (229,1,19,4,3,5.49),
	 (229,1,19,3,3,1360.0),
	 (229,1,19,2,3,0.0000304);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (229,2,19,1,3,16.402691928),
	 (229,2,19,5,3,0.0000005815618459),
	 (229,2,19,4,3,0.57095888944),
	 (229,2,19,3,3,0.033634912008),
	 (229,2,19,2,3,0.0000029994030016),
	 (229,4,19,1,3,55.9),
	 (229,4,19,5,3,0.0000664),
	 (229,4,19,4,3,0.264),
	 (229,4,19,3,3,1.93),
	 (229,4,19,2,3,0.00000169);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (47,1,1,1,3,2935.5392),
	 (47,1,1,5,3,0.06377608),
	 (47,1,1,4,3,16.62232),
	 (47,1,1,3,3,445.2614),
	 (47,1,1,2,3,0.0000917808),
	 (47,2,1,1,3,54.7419852343155),
	 (47,2,1,5,3,0.0000020782000489),
	 (47,2,1,4,3,0.240761987817827),
	 (47,2,1,3,3,0.974698151287876),
	 (47,2,1,2,3,0.0000014734923621);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (47,3,1,1,3,234.62784),
	 (47,3,1,5,3,0.000110754432),
	 (47,3,1,4,3,1.3497408),
	 (47,3,1,3,3,6067.5264),
	 (47,3,1,2,3,0.000052475904),
	 (47,4,1,1,3,9.51974),
	 (47,4,1,5,3,0.00001782262),
	 (47,4,1,4,3,0.1452076),
	 (47,4,1,3,3,0.721642),
	 (47,4,1,2,3,0.0000004881976);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (75,1,2,1,3,253.0),
	 (75,1,2,5,3,0.0237),
	 (75,1,2,4,3,1.87),
	 (75,1,2,3,3,4610.0),
	 (75,1,2,2,3,0.0000106),
	 (75,2,2,1,3,71.03450331008),
	 (75,2,2,5,3,0.0000026967218602),
	 (75,2,2,4,3,0.3124184873344),
	 (75,2,2,3,3,1.26479152624128),
	 (75,2,2,2,3,0.0000019120387693);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (75,4,2,1,3,18.0),
	 (75,4,2,5,3,0.00000676),
	 (75,4,2,4,3,0.483),
	 (75,4,2,3,3,1.45),
	 (75,4,2,2,3,0.00000112),
	 (170,1,14,1,3,286.0),
	 (170,1,14,5,3,0.041),
	 (170,1,14,4,3,1.81),
	 (170,1,14,3,3,265.0),
	 (170,1,14,2,3,0.00000996);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (170,2,14,1,3,61.60023333921),
	 (170,2,14,5,3,0.0000023385634881),
	 (170,2,14,4,3,0.2709254069853),
	 (170,2,14,3,3,1.09681140166236),
	 (170,2,14,2,3,0.0000016580961202),
	 (170,3,14,1,3,58.65696),
	 (170,3,14,5,3,0.000027688608),
	 (170,3,14,4,3,0.3374352),
	 (170,3,14,3,3,1516.8816),
	 (170,3,14,2,3,0.000013118976);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (170,4,14,1,3,11.6),
	 (170,4,14,5,3,0.0000298),
	 (170,4,14,4,3,0.12),
	 (170,4,14,3,3,0.874),
	 (170,4,14,2,3,0.000000606),
	 (391,1,26,1,3,283.1298),
	 (391,1,26,5,3,0.02818336),
	 (391,1,26,4,3,1.79083),
	 (391,1,26,3,3,534.5868),
	 (391,1,26,2,3,0.0000098922);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (391,2,26,1,3,26.1969476654181),
	 (391,2,26,5,3,0.0000009945291112),
	 (391,2,26,4,3,0.115217399728717),
	 (391,2,26,3,3,0.466444838446633),
	 (391,2,26,2,3,0.0000007051443628),
	 (391,3,26,1,3,123.179616),
	 (391,3,26,5,3,0.0000581460768),
	 (391,3,26,4,3,0.70861392),
	 (391,3,26,3,3,3185.45136),
	 (391,3,26,2,3,0.0000275498496);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (391,4,26,1,3,4.89989),
	 (391,4,26,5,3,0.00000732568),
	 (391,4,26,4,3,0.0862924),
	 (391,4,26,3,3,0.389088),
	 (391,4,26,2,3,0.0000002591474),
	 (395,1,30,1,3,172.9598),
	 (395,1,30,5,3,0.02395136),
	 (395,1,30,4,3,1.14683),
	 (395,1,30,3,3,530.0328),
	 (395,1,30,2,3,0.0000063272);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (395,2,30,1,3,23.618617178085),
	 (395,2,30,5,3,0.0000008966465349),
	 (395,2,30,4,3,0.103877584946251),
	 (395,2,30,3,3,0.420536858517594),
	 (395,2,30,2,3,0.0000006357433306),
	 (395,3,30,1,3,24.81189408),
	 (395,3,30,5,3,0.000011712281184),
	 (395,3,30,4,3,0.1427350896),
	 (395,3,30,3,3,641.6409168),
	 (395,3,30,2,3,0.000005549326848);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (395,4,30,1,3,4.17079),
	 (395,4,30,5,3,0.00000706808),
	 (395,4,30,4,3,0.0700544),
	 (395,4,30,3,3,0.336418),
	 (395,4,30,2,3,0.0000002198174),
	 (396,1,31,1,3,177.7498),
	 (396,1,31,5,3,0.02413536),
	 (396,1,31,4,3,1.17483),
	 (396,1,31,3,3,530.2308),
	 (396,1,31,2,3,0.0000064822);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (396,2,31,1,3,23.7307185036213),
	 (396,2,31,5,3,0.0000009009022991),
	 (396,2,31,4,3,0.104370620371576),
	 (396,2,31,3,3,0.422532857644944),
	 (396,2,31,2,3,0.0000006387607668),
	 (396,3,31,1,3,46.3389984),
	 (396,3,31,5,3,0.00002187400032),
	 (396,3,31,4,3,0.266573808),
	 (396,3,31,3,3,1198.336464),
	 (396,3,31,2,3,0.00001036399104);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (396,4,31,1,3,4.20249),
	 (396,4,31,5,3,0.00000707928),
	 (396,4,31,4,3,0.0707604),
	 (396,4,31,3,3,0.338708),
	 (396,4,31,2,3,0.0000002215274),
	 (400,1,32,1,3,172.9598),
	 (400,1,32,5,3,0.02395136),
	 (400,1,32,4,3,1.14683),
	 (400,1,32,3,3,530.0328),
	 (400,1,32,2,3,0.0000063272);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (400,2,32,1,3,23.618617178085),
	 (400,2,32,5,3,0.0000008966465349),
	 (400,2,32,4,3,0.103877584946251),
	 (400,2,32,3,3,0.420536858517594),
	 (400,2,32,2,3,0.0000006357433306),
	 (400,3,32,1,3,29.68042176),
	 (400,3,32,5,3,0.000014010435648),
	 (400,3,32,4,3,0.1707422112),
	 (400,3,32,3,3,767.5420896),
	 (400,3,32,2,3,0.000006638201856);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (400,4,32,1,3,4.17079),
	 (400,4,32,5,3,0.00000706808),
	 (400,4,32,4,3,0.0700544),
	 (400,4,32,3,3,0.336418),
	 (400,4,32,2,3,0.0000002198174),
	 (399,1,27,1,3,206.4898),
	 (399,1,27,5,3,0.02523936),
	 (399,1,27,4,3,1.34283),
	 (399,1,27,3,3,531.4188),
	 (399,1,27,2,3,0.0000074122);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (399,2,27,1,3,24.4033264568386),
	 (399,2,27,5,3,0.0000009264368842),
	 (399,2,27,4,3,0.107328832923524),
	 (399,2,27,3,3,0.434508852409041),
	 (399,2,27,2,3,0.0000006568653839),
	 (399,3,27,1,3,111.448224),
	 (399,3,27,5,3,0.0000526083552),
	 (399,3,27,4,3,0.64112688),
	 (399,3,27,3,3,2882.07504),
	 (399,3,27,2,3,0.0000249260544);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (399,4,27,1,3,4.39269),
	 (399,4,27,5,3,0.00000714648),
	 (399,4,27,4,3,0.0749964),
	 (399,4,27,3,3,0.352448),
	 (399,4,27,2,3,0.0000002317874),
	 (401,1,28,1,3,225.6498),
	 (401,1,28,5,3,0.02597536),
	 (401,1,28,4,3,1.45483),
	 (401,1,28,3,3,532.2108),
	 (401,1,28,2,3,0.0000080322);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (401,2,28,1,3,24.8517317589835),
	 (401,2,28,5,3,0.0000009434599409),
	 (401,2,28,4,3,0.109300974624822),
	 (401,2,28,3,3,0.442492848918439),
	 (401,2,28,2,3,0.0000006689351286),
	 (401,3,28,1,3,142.5364128),
	 (401,3,28,5,3,0.00006728331744),
	 (401,3,28,4,3,0.819967536),
	 (401,3,28,3,3,3686.022288),
	 (401,3,28,2,3,0.00003187911168);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (401,4,28,1,3,4.51949),
	 (401,4,28,5,3,0.00000719128),
	 (401,4,28,4,3,0.0778204),
	 (401,4,28,3,3,0.361608),
	 (401,4,28,2,3,0.0000002386274),
	 (403,1,29,1,3,1394.4098),
	 (403,1,29,5,3,0.07087136),
	 (403,1,29,4,3,8.28683),
	 (403,1,29,3,3,580.5228),
	 (403,1,29,2,3,0.0000458522);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (403,2,29,1,3,52.2044551898211),
	 (403,2,29,5,3,0.0000019818664022),
	 (403,2,29,4,3,0.229601618404024),
	 (403,2,29,3,3,0.929516635991722),
	 (403,2,29,2,3,0.0000014051895572),
	 (403,3,29,1,3,296.217648),
	 (403,3,29,5,3,0.0001398274704),
	 (403,3,29,4,3,1.70404776),
	 (403,3,29,3,3,7660.25208),
	 (403,3,29,2,3,0.0000662508288);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (403,4,29,1,3,12.25429),
	 (403,4,29,5,3,0.00000992408),
	 (403,4,29,4,3,0.2500844),
	 (403,4,29,3,3,0.920368),
	 (403,4,29,2,3,0.0000006558674),
	 (378,1,25,1,3,6812.37),
	 (378,1,25,5,3,0.04239102),
	 (378,1,25,4,3,37.7805),
	 (378,1,25,3,3,344.9241),
	 (378,1,25,2,3,0.000208473);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (378,2,25,1,3,2.08752768),
	 (378,2,25,5,3,0.000000082010016),
	 (378,2,25,4,3,0.0132127248),
	 (378,2,25,3,3,0.0050945616),
	 (378,2,25,2,3,0.000000107275728),
	 (378,3,25,1,3,168.9320448),
	 (378,3,25,5,3,0.00007974319104),
	 (378,3,25,4,3,0.971813376),
	 (378,3,25,3,3,4368.619008),
	 (378,3,25,2,3,0.00003778265088);
INSERT INTO opsian.Composant_M (idNomComposant,idEtapeACV,idType,idCritere,idSource,valeur) VALUES
	 (378,4,25,1,3,31.776),
	 (378,4,25,5,3,0.0001097256),
	 (378,4,25,4,3,0.21975),
	 (378,4,25,3,3,2.6142),
	 (378,4,25,2,3,0.0000015837);


INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('11T 5G',22),
	 ('A72',22),
	 ('A74 5G',23),
	 ('A74',23),
	 ('ACER  CHROMEBOOK SPIN 514',16),
	 ('ACER  CHROMEBOOK SPIN 714',16),
	 ('ACER CBA242Y',4),
	 ('ACER CHROMEBOOK ENTERPRISE SPIN 514',16),
	 ('ACER CHROMEBOOK SPIN 713',33),
	 ('ACER CHROMEBOOK VERO 514',33);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('ALCATEL One Touch 2038',22),
	 ('ALCATEL One Touch 2045',22),
	 ('ALIENWARE M15 R3',18),
	 ('ALIM 61W MACBOOK PRO 13 POUCES',20),
	 ('AOC U2879VF',4),
	 ('APPLE  DISPLAY STUDIO 27',4),
	 ('APPLE DOCKING STATION MAC',12),
	 ('APPLE IPAD 1 16GB',33),
	 ('APPLE IPAD 7TH GEN 32 GB',33),
	 ('APPLE IPAD 9 5',33);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('APPLE IPAD AIR WIFI PLUS CELLULAR 256GB',35),
	 ('APPLE IPAD PRO 10 5 256 Go',34),
	 ('APPLE IPAD PRO 11 Pouces 256 Go',35),
	 ('APPLE IPAD PRO 11-INCH 128 GB',35),
	 ('APPLE IPAD PRO 12 9 Pouces 256 Go',35),
	 ('APPLE IPAD PRO 12 9 Pouces 512 Go',35),
	 ('APPLE IPAD PRO 5TH 256GO',35),
	 ('APPLE IPHONE 11 128GB',22),
	 ('APPLE IPHONE 11 256GB',22),
	 ('APPLE IPHONE 11 64GB',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('APPLE IPHONE 11 PRO MAX 256GB',22),
	 ('APPLE IPHONE 12 128GB',22),
	 ('APPLE IPHONE 12 PRO MAX 256GB',24),
	 ('APPLE IPHONE 13 128GB',22),
	 ('APPLE IPHONE 13 PRO MAX 128GB',24),
	 ('APPLE IPHONE 13 PRO MAX 512GB',24),
	 ('APPLE IPHONE 14 128GB',22),
	 ('APPLE IPHONE 14 PLUS 128GB',22),
	 ('APPLE IPHONE 14 PLUS 256GB',22),
	 ('APPLE IPHONE 14 PRO 128GB',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('APPLE IPHONE 14 PRO 1TB',22),
	 ('APPLE IPHONE 14 PRO 512GB',22),
	 ('APPLE IPHONE 14 PRO MAX 128GB',24),
	 ('APPLE IPHONE 14 PRO MAX 256GB',22),
	 ('APPLE IPHONE 14 PRO MAX 512GB',22),
	 ('APPLE IPHONE 6S',22),
	 ('APPLE IPHONE 7 SFR',22),
	 ('APPLE IPHONE 7+',22),
	 ('APPLE IPHONE 7',23),
	 ('APPLE IPHONE 8 PLUS SFR',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('APPLE IPHONE 8 PLUS',22),
	 ('APPLE IPHONE 8',23),
	 ('APPLE IPHONE SE',22),
	 ('APPLE IPHONE X',23),
	 ('APPLE IPHONE XR 128GB',22),
	 ('APPLE IPHONE XR 64GB',22),
	 ('APPLE IPHONE XS MAX',22),
	 ('APPLE IPHONE XS',22),
	 ('APPLE MAC BOOK AIR 13',17),
	 ('APPLE MAC BOOK PRO 14 1',16);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('APPLE MACBOOK AIR M1 13',17),
	 ('APPLE MACBOOK AIR M2 13',17),
	 ('APPLE MACBOOK PRO 13 Touch ID',17),
	 ('APPLE MACBOOK PRO 13',17),
	 ('APPLE MACBOOK PRO 15 Touch ID',18),
	 ('APPLE MACBOOK PRO 16 Touch ID',18),
	 ('APPLE MACBOOK PRO M1 13 Touch ID',16),
	 ('APPLE MACBOOK PRO M1 13',17),
	 ('APPLE MACBOOK PRO M1 14',16),
	 ('APPLE MACBOOK PRO M1 16',11);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('ASUS CHROMEBOOK C423',33),
	 ('ASUS CHROMEBOOK C423N',33),
	 ('ASUS CHROMEBOOK C434',34),
	 ('ASUS GOOGLE MEET HARDWARE',8),
	 ('Aruba JL261A',30),
	 ('Aruba JW805A',41),
	 ('Aruba JW811A',41),
	 ('BLUEBIRD EF500',33),
	 ('BLUEBIRD EF500R',34),
	 ('BROTHER HL-2070N',21);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('BROTHER HL-8050N',21),
	 ('Brocade BR-CER-2024F-4X-RT-AC',30),
	 ('CARTE SD 32/64 GO',40),
	 ('CASQUE BLUETOOTH',7),
	 ('CASQUE FILAIRE',7),
	 ('CHARGEUR APPLE MACBOOK AIR M1 USB-C',20),
	 ('CHARGEUR DELL - 65W',20),
	 ('CLE USB 16/32/64Go',40),
	 ('CORE-X5',22),
	 ('CROSSCALL Action X3',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('CROSSCALL SPIDER-X1',22),
	 ('CROSSCALL SPIDER-X5',22),
	 ('CROSSCALL',23),
	 ('Cisco 5672UP',27),
	 ('Cisco AIR-ANT2465P-R',19),
	 ('Cisco AIR-ANT2524V4C-R',19),
	 ('Cisco AIR-ANT2544V4M-R',19),
	 ('Cisco AIR-ANT2566P4W-R',19),
	 ('Cisco AIR-ANT5114P2M-N',19),
	 ('Cisco AIR-ANT5195P-R',19);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Cisco AIR-ANT5959',19),
	 ('Cisco AIR-AP1242AG-E-K9',41),
	 ('Cisco AIR-CAP2602E-E-K9',41),
	 ('Cisco AIR-CAP2602I-E-K9',41),
	 ('Cisco AIR-CAP2702E-E-K9',41),
	 ('Cisco AIR-CAP2702I-E-K9',41),
	 ('Cisco AIR-LAP1142N-E-K9',41),
	 ('Cisco AIR-LAP1262N-E-K9',41),
	 ('Cisco AIR-SAP2602E-E-K9',41),
	 ('Cisco AIR-SAP2602I-E-K9',41);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Cisco AMIM-2458PV0003',41),
	 ('Cisco AP1142 Int',41),
	 ('Cisco AP1262 Ext',41),
	 ('Cisco AP2602 Ext',41),
	 ('Cisco APP-FW-315-C1',14),
	 ('Cisco APP-FW-315-C2',14),
	 ('Cisco C6807-XL',27),
	 ('Cisco C9200-24T-4G',31),
	 ('Cisco Catalyst 29xxStack',27),
	 ('Cisco M3-APP-FW-315-C1',14);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Cisco M3-APP-FW-315-C1-3 years',14),
	 ('Cisco N5K-5596',27),
	 ('Cisco N5K-5624Q',27),
	 ('Cisco N7K-C7706',27),
	 ('Cisco Nexus 5548UP',27),
	 ('Cisco Nexus 9348GC-FXP',28),
	 ('Cisco Systems  Inc. N5K-C5672UP',29),
	 ('Cisco Systems  Inc. N9K-C9364C',29),
	 ('Cisco WS-C2960S-48TS-L',27),
	 ('Cisco WS-C3650-24TS',31);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Cisco WS-C3650-48TS',28),
	 ('DATACENTER',1),
	 ('DELL 1909W',4),
	 ('DELL 2411H',4),
	 ('DELL 2412M',4),
	 ('DELL 2717H',4),
	 ('DELL CHARGEUR XPS 13 360Â° USB C',20),
	 ('DELL CHROMEBOOK 3100',17),
	 ('DELL CHROMEBOOK 5300',33),
	 ('DELL CHROMEBOOK 5400',34);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL CHROMEBOOK LATITUDE 7410 2IN1',17),
	 ('DELL CHROMEBOOK LATITUDE 7410',17),
	 ('DELL DELL ULTRA SHARP 27 4K',5),
	 ('DELL DOCKING STATION 130W',12),
	 ('DELL DOCKING STATION 180W',12),
	 ('DELL E2283HS',4),
	 ('DELL E2422HS',4),
	 ('DELL E2481HS',4),
	 ('DELL E2483HS',4),
	 ('DELL E5440',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL E6320',16),
	 ('DELL E6330',16),
	 ('DELL E6430',17),
	 ('DELL E7280',17),
	 ('DELL E7290',17),
	 ('DELL E7440',16),
	 ('DELL E7450',17),
	 ('DELL E7470',17),
	 ('DELL E7480',17),
	 ('DELL E7490',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL LATITUDE  9420 2IN1',17),
	 ('DELL LATITUDE 5285',34),
	 ('DELL LATITUDE 5300',17),
	 ('DELL LATITUDE 5310',17),
	 ('DELL LATITUDE 5320',17),
	 ('DELL LATITUDE 5330',17),
	 ('DELL LATITUDE 5400',17),
	 ('DELL LATITUDE 5410',17),
	 ('DELL LATITUDE 5420',18),
	 ('DELL LATITUDE 5430',18);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL LATITUDE 5520',18),
	 ('DELL LATITUDE 7280',17),
	 ('DELL LATITUDE 7290',17),
	 ('DELL LATITUDE 7400',17),
	 ('DELL LATITUDE 9420',17),
	 ('DELL LATITUDE 9430',17),
	 ('DELL Mini PC CUBE',8),
	 ('DELL OPTIPLEX 3000M',9),
	 ('DELL OPTIPLEX 3020 Small',8),
	 ('DELL OPTIPLEX 3020',8);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL OPTIPLEX 3050M',9),
	 ('DELL OPTIPLEX 3060M',9),
	 ('DELL OPTIPLEX 3080 MFF',9),
	 ('DELL OPTIPLEX 3080M',9),
	 ('DELL OPTIPLEX 3090M',10),
	 ('DELL OPTIPLEX 380',8),
	 ('DELL OPTIPLEX 7000M',10),
	 ('DELL Optiplex 3040M',9),
	 ('DELL P1911',4),
	 ('DELL P1913',4);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL P2210T',4),
	 ('DELL P2217H',4),
	 ('DELL P2312H',4),
	 ('DELL P2319H',4),
	 ('DELL P2412H',4),
	 ('DELL P2415Q',4),
	 ('DELL P2417H',4),
	 ('DELL P2419H',4),
	 ('DELL P2422H',4),
	 ('DELL P2515Q',4);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL P2719H',5),
	 ('DELL P2721Q',5),
	 ('DELL PRECISION 3530',16),
	 ('DELL PRECISION 3541',16),
	 ('DELL PRECISION 3551',18),
	 ('DELL PRECISION 3561',18),
	 ('DELL PRECISION 3571',18),
	 ('DELL PRECISION 5510',16),
	 ('DELL PRECISION 5530',17),
	 ('DELL PRECISION 5540',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL PRECISION 5550',18),
	 ('DELL PRECISION 5560',18),
	 ('DELL PRECISION 5570',18),
	 ('DELL PRECISION 7560',18),
	 ('DELL PRECISION M3800',17),
	 ('DELL Portable E4310',16),
	 ('DELL Portable Latitude D630',17),
	 ('DELL Portable Latitude E6400',17),
	 ('DELL Prolite E2282HS-GB1',4),
	 ('DELL S2216H',4);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL S2240L',4),
	 ('DELL S2719H',5),
	 ('DELL U2412M',4),
	 ('DELL U2415Q',4),
	 ('DELL U2419H',4),
	 ('DELL U2716D',5),
	 ('DELL U2718Q',5),
	 ('DELL U2719D',5),
	 ('DELL U2723QE',5),
	 ('DELL U3219Q',6);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL U3419W',6),
	 ('DELL U3421',36),
	 ('DELL UP2516D',4),
	 ('DELL UP2518D',4),
	 ('DELL UP2716D',5),
	 ('DELL UP2716DA',5),
	 ('DELL UP2718Q',5),
	 ('DELL UP2720Q',5),
	 ('DELL UP3216Q',5),
	 ('DELL Vostro V131',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('DELL XPS 13 7390 2IN1',17),
	 ('DELL XPS 13 9310 2IN1',17),
	 ('DELL XPS 13 9365 2IN1',17),
	 ('DELL XPS 13 9370 2IN1',17),
	 ('DELL XPS 13',17),
	 ('DELL XPS 15 9550',18),
	 ('DELL XPS 15 9570',18),
	 ('DISQUE DUR EXTERNE 1TO',13),
	 ('Dell Power Companion',20),
	 ('ELO TOUCH Ecran tactile 15',4);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('ELO TOUCH Ecran tactile 22',5),
	 ('EPSON Actualser CX21N',21),
	 ('EPSON B40W',21),
	 ('EPSON B510DN',21),
	 ('EPSON BAC EPL N3000',21),
	 ('EPSON CX11',21),
	 ('EPSON CX29',21),
	 ('EPSON EPL N3000 + BAC',21),
	 ('EPSON EPL N3000',21),
	 ('EPSON M2400DN + BAC',21);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('EPSON M2400DN',21),
	 ('EPSON M400DN + BAC',21),
	 ('EPSON M400DN',21),
	 ('EPSON SC-T3100X',21),
	 ('EPSON SC-T3405',21),
	 ('EPSON STYLUS 4450',21),
	 ('EPSON T7000',21),
	 ('EPSON TMH 6000 II MICR Beetle',3),
	 ('EPSON TMH 6000 IV MICR Beetle',3),
	 ('EPSON TMH 6000 IV',3);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('EPSON TMH 6000 V noire',3),
	 ('EPSON TMH 6000',3),
	 ('FAIRPHONE  4 5G',24),
	 ('FAIRPHONE 3 / 3+',22),
	 ('FAIRPHONE FAIRPHONE 3+',22),
	 ('FAIRPHONE FAIRPHONE 3',22),
	 ('FAIRPHONE FAIRPHONE 4',22),
	 ('FEC AM1017',36),
	 ('Find X3 Neo 5G',22),
	 ('Forcepoint NGFW 330',14);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Fortigate FG-1801F',14),
	 ('Fortigate FG61F',14),
	 ('Fortigate FG81F',14),
	 ('GALAXY A52 (SM-A525F-DS)',23),
	 ('GALAXY A52 5G (SM-A526)',22),
	 ('GALAXY A52 5G',22),
	 ('GALAXY A52S 5G',23),
	 ('GALAXY A52s 5G (SM-A528)',22),
	 ('GALAXY A53 5G (SM-A536)',22),
	 ('GALAXY S10 (SM-G973F)',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('GALAXY S20 FE 5G (G781B)',22),
	 ('GALAXY S20+ 5G (SM-G986B)',22),
	 ('GALAXY S21 5G (SM-G991B)',22),
	 ('GALAXY S21 5G',23),
	 ('GALAXY S21 FE 5G (G990B)',22),
	 ('GALAXY S21 Ultra 5G -G998',24),
	 ('GALAXY S21+ 5G (SM-G996B)',22),
	 ('GALAXY S21+ 5G',22),
	 ('GALAXY S22 (SM-S901B)',24),
	 ('GALAXY S22+ (SM-S906B)',24);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('GALAXY TAB A7 LITE SM T225 32G 4G',33),
	 ('GALAXY TAB A8 WIFI SM X200',33),
	 ('GALAXY Z Flip3 5G (F711B)',22),
	 ('HOSTING',25),
	 ('HOSTING_MAG',25),
	 ('HP 2015DN',21),
	 ('HP 2055DN',21),
	 ('HP 2UD96AA',4),
	 ('HP 401DNE + BAC',21),
	 ('HP 401DNE',21);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP 402DNE + BAC',21),
	 ('HP 402DNE',21),
	 ('HP 404DNE + BAC',21),
	 ('HP 404DNE',21),
	 ('HP 605DN',21),
	 ('HP 608DN + BAC',21),
	 ('HP 608DN',21),
	 ('HP 8000 Elite',8),
	 ('HP 8440p',16),
	 ('HP 8460',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP 8470',17),
	 ('HP 8470w',16),
	 ('HP AIR-CAP2602E-E-K9',41),
	 ('HP AIR-CAP2602I-E-K9',41),
	 ('HP AIR-SAP2602E-E-K9',41),
	 ('HP APP-FW-315-C1',14),
	 ('HP Alim 1500W zl',2),
	 ('HP Alim 875W zl',2),
	 ('HP CHROMEBOOK PRO C640',35),
	 ('HP D530',8);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP DC5000',8),
	 ('HP DC7600',8),
	 ('HP DC7700 SFF CELERON 1GB',8),
	 ('HP DC7700 SFF CELERON 2GB avec image',8),
	 ('HP DC7700',8),
	 ('HP DC7800 SFF CELERON 2GB',9),
	 ('HP DC7800',9),
	 ('HP ECRAN 17',4),
	 ('HP ELITE C645 G2 CHROMEBOOK ENTERPRISE',17),
	 ('HP ELITE DRAGON FLY',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP ELITE DRAGONFLY CHROMEBOOK ENTERPRISE',16),
	 ('HP ELITEBOOK 1040 G3',17),
	 ('HP FOLIO 1020 G1',16),
	 ('HP FOLIO 1030 G1',16),
	 ('HP FOLIO 1040 G3',16),
	 ('HP J4858C',15),
	 ('HP J8692A',30),
	 ('HP J8993A',30),
	 ('HP J9299A',30),
	 ('HP J9306A',30);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP J9534A',30),
	 ('HP J9535A',30),
	 ('HP J9624A',30),
	 ('HP J9642A',30),
	 ('HP J9773A',30),
	 ('HP J9774A',30),
	 ('HP J9821A',30),
	 ('HP J9829A',30),
	 ('HP J9986A',30),
	 ('HP J9990A',30);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP Juniper SSG-5-SH',14),
	 ('HP LA1905wg',4),
	 ('HP LaserJet Pro M404dn',21),
	 ('HP M506DN + BAC',21),
	 ('HP M506DN',21),
	 ('HP M507DN + BAC',21),
	 ('HP M507DN',21),
	 ('HP NC6000',17),
	 ('HP PROBOOK 440 G3',17),
	 ('HP Pro C640 G2',17);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP RP5700 avec lecteur DVD',8),
	 ('HP RP5700',8),
	 ('HP RP5800',9),
	 ('HP RP5810',9),
	 ('HP Switch 2520',30),
	 ('HP Switch 2610',30),
	 ('HP Switch 3500 yl',30),
	 ('HP T610',9),
	 ('HP T620',9),
	 ('HP T630',9);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('HP T640 SANS IMAGE LM',9),
	 ('HP T640',9),
	 ('HP Z200',9),
	 ('HP Z210',9),
	 ('HP Z440',11),
	 ('HUAWEI P20 LITE',22),
	 ('HUAWEI P20',23),
	 ('HUAWEI P9',23),
	 ('HUB USB',39),
	 ('Hannspree HC284',36);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('IIYAMA PROLITE XB2481HS',4),
	 ('IPHONE 12 PRO 128GB',22),
	 ('IPHONE 12 PRO 512GB',24),
	 ('IPHONE 13 128GB',22),
	 ('IPHONE 13 PRO 128GB',24),
	 ('IPHONE 13 PRO 256GB',24),
	 ('IPHONE 13 PRO MAX 256GB',22),
	 ('JABRA SPEAK SANS FIL 510',7),
	 ('Juniper Networks EX3400',30),
	 ('Juniper Networks EX3400-24P',30);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('Juniper Networks EX3400-48P',32),
	 ('Juniper Networks EX4300-24P',30),
	 ('Juniper Networks EX4300-48P',32),
	 ('Juniper Networks MX 204',27),
	 ('LAIRD antenna PDQ24518-MI1-LAIRD',19),
	 ('LENOVO CHROMEBOOK THINKPAD C13 YOGA',16),
	 ('LENOVO LT1952P',4),
	 ('LENOVO M73',8),
	 ('LENOVO THINKPAD S440',16),
	 ('LENOVO THINKPAD T430u',16);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('MACBOOK PRO 15 Touch ID',9),
	 ('MCAFFEE FWL-321-C1',14),
	 ('MICROSOFT SURFACE PRO 3',34),
	 ('MICROSOFT SURFACE STUDIO',10),
	 ('MIST AP41-WW',41),
	 ('MIST AP41E-WW',41),
	 ('MIST AP43-WW',41),
	 ('MIST AP61-WW',41),
	 ('MOTOROLA VC5090',35),
	 ('MSI MD241PW',4);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('OKI B6300DN',21),
	 ('OKI B721 + BAC',21),
	 ('OKI B721',21),
	 ('OKI C5450N',21),
	 ('OKI C5900N + BAC',21),
	 ('OKI C5900N',21),
	 ('OKI C5950N',21),
	 ('OKI C610DN + BAC',21),
	 ('OKI C610DN',21),
	 ('OKI C612DN + BAC',21);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('OKI C612DN',21),
	 ('OKI C650DN + BAC',21),
	 ('OKI C650DN',21),
	 ('OKI C7350N',21),
	 ('OPPO A72',22),
	 ('OPPO RENO4 5G',23),
	 ('P2719',5),
	 ('P2720DC',5),
	 ('PHILIPS 346B1',36),
	 ('PHILIPS ECRAN LCD 32',5);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('PHILIPS ECRAN LCD 46',36),
	 ('PHILIPS ECRAN LCD 48',36),
	 ('PHILIPS ECRAN LCD 50',37),
	 ('PIXEL 4A',22),
	 ('PIXEL 6',23),
	 ('POCO X4 Pro',22),
	 ('PRO MP242',4),
	 ('SAMSUNG  GALAXY S23 128GB',22),
	 ('SAMSUNG  GALAXY S23 PLUS 256GB',22),
	 ('SAMSUNG GALAXY A10',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('SAMSUNG GALAXY A3',22),
	 ('SAMSUNG GALAXY A40',22),
	 ('SAMSUNG GALAXY A41',22),
	 ('SAMSUNG GALAXY A5',22),
	 ('SAMSUNG GALAXY A50',22),
	 ('SAMSUNG GALAXY A51',22),
	 ('SAMSUNG GALAXY A52S 128GB',22),
	 ('SAMSUNG GALAXY A70',22),
	 ('SAMSUNG GALAXY A71',22),
	 ('SAMSUNG GALAXY A8',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('SAMSUNG GALAXY J5',22),
	 ('SAMSUNG GALAXY J7',22),
	 ('SAMSUNG GALAXY NOTE 10 PLUS',22),
	 ('SAMSUNG GALAXY NOTE 9',22),
	 ('SAMSUNG GALAXY NOTE',22),
	 ('SAMSUNG GALAXY S10 PLUS',22),
	 ('SAMSUNG GALAXY S10',22),
	 ('SAMSUNG GALAXY S20 FE',22),
	 ('SAMSUNG GALAXY S20',22),
	 ('SAMSUNG GALAXY S21 FE 5G',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('SAMSUNG GALAXY S21 ULTRA 5G',24),
	 ('SAMSUNG GALAXY S22 128GB',22),
	 ('SAMSUNG GALAXY S22 PLUS 256GB',24),
	 ('SAMSUNG GALAXY S22 ULTRA 256GB',24),
	 ('SAMSUNG GALAXY S23 256GB',22),
	 ('SAMSUNG GALAXY S23 ULTRA 256GB',22),
	 ('SAMSUNG GALAXY S7',22),
	 ('SAMSUNG GALAXY S8',22),
	 ('SAMSUNG GALAXY S9 PLUS',22),
	 ('SAMSUNG GALAXY S9',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('SAMSUNG GALAXY TAB 2 10.1',33),
	 ('SAMSUNG GALAXY TAB A7 32GO',33),
	 ('SAMSUNG QM65R-B',38),
	 ('SAMSUNG S24A410H',4),
	 ('SAMSUNG S27A700NWU',5),
	 ('SAMSUNG T45F',6),
	 ('SAMSUNG TAB GALAXY A 2016',33),
	 ('SAMSUNG TAB GALAXY S3',33),
	 ('SAMSUNG U28E570DSL',5),
	 ('SAMSUNG XCOVER4',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('SPIDER X1',23),
	 ('SUPPORT LAPTOP',12),
	 ('SYMBOL MC3000',23),
	 ('SYMBOL MC3090',23),
	 ('SYMBOL MC3190',23),
	 ('SYMBOL MC7090',23),
	 ('SYMBOL MC9090',23),
	 ('SYMBOL MC9190',23),
	 ('TELINDUS AIR-BR1310G-E-K9',41),
	 ('TELINDUS AIR-WLC4404-100-K9',41);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('UP2516D',4),
	 ('Unknown',26),
	 ('VIEWSONIC VS17495',36),
	 ('WACOM INTUOS CTL-4100',4),
	 ('XIAOMI 12 256GB',23),
	 ('ZEBRA ET51',34),
	 ('ZEBRA GX420',21),
	 ('ZEBRA MC32',23),
	 ('ZEBRA MC75A0',23),
	 ('ZEBRA MC92',23);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('ZEBRA TC52',23),
	 ('ZEBRA TC8000',23),
	 ('ZEBRA TC8300',23),
	 ('ciscoSystems CAT3K_CAA-UNIVERSALK9-M',29),
	 ('ciscoSystems N9K-C93180YC-FX',27),
	 ('ciscoSystems ciscoASR1001HX',27),
	 ('iPHONE 11',23),
	 ('iPHONE 12 Pro Max',23),
	 ('iPHONE 12 Pro',23),
	 ('iPHONE 12 mini',23);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('iPHONE 12',23),
	 ('iPHONE 13 Pro Max',24),
	 ('iPHONE 13 Pro',23),
	 ('iPHONE 13 mini',23),
	 ('iPHONE 13',23),
	 ('iPHONE 14 Plus',22),
	 ('iPHONE 14 Pro Max',24),
	 ('iPHONE 14 Pro',24),
	 ('iPHONE 14',24),
	 ('iPHONE 7',22);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('iPHONE 8',22),
	 ('iPHONE SE 2020',22),
	 ('iPHONE SE 2022',22),
	 ('iPHONE SE',22),
	 ('iPHONE X',22),
	 ('iPHONE XR',23),
	 ('iPHONE XS',22),
	 ('default',17),
	 ('/tablette',35),
	 ('/pc fixe',11);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('/pc portable',18),
	 ('/television',38),
	 ('/routeur',15),
	 ('/baie de stockage',25),
	 ('/smartphone',24),
	 ('/imprimante laser',21),
	 ('/enceinte connectée',7),
	 ('/écran',6),
	 ('/serveur',1),
	 ('/firewall',14);
INSERT INTO opsian.Reference_M (nomReference,idType) VALUES
	 ('/stockage externe',10);

	 INSERT INTO Type_M (type,dureeVie)
VALUES
	("personnal-laser-printer-1",8.106475756);

INSERT INTO Composant_M  (idNomComposant, idEtapeACV, idType, idCritere, idSource, valeur)
VALUES
    (231,1,42 ,1,3 ,105 ),
    (231,1,42 ,5,3 ,0.00828 ),
    (231,1,42 ,4,3 ,0.694 ),
    (231,1,42 ,3,3 , 632),
    (231,1,42 ,2,3 , 0.00000463),
    (231,2,42 ,1,3 ,2.9741846064 ),
    (231,2,42 ,5,3 , 0.000000105450513696),
    (231,2,42 ,4,3 , 0.103527954272),
    (231,2,42 ,3,3 , 0.0060987817104),
    (231,2,42 ,2,3 , 0.00000054386062208),
    (231,3,42 ,1,3 , 1.543428),
    (231,3,42 ,5,3 , 0.0000007285644),
    (231,3,42 ,4,3 , 0.00887886),
    (231,3,42 ,3,3 , 39.91338),
    (231,3,42 ,2,3 , 0.0000003451968),
    (231,4,42 ,1,3 , 10.2),
    (231,4,42 ,5,3 , 0.000037),
    (231,4,42 ,4,3 , 0.108),
    (231,4,42 ,3,3 , 0.755),
    (231,4,42 ,2,3 , 0.000000546)
    ;
  
   UPDATE Reference_M
   SET nomReference = '/serveur impression'
   WHERE idReference = 1032;
   
   INSERT INTO Reference_M (nomReference, idType)
   VALUES
   		("/imprimante personnelle",42);
