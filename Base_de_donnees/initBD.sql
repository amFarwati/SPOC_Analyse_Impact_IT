create database if not exists opsian;
use opsian;
create user 'numuser'@'localhost' identified with mysql_native_password by 'spocBDD';
flush privileges;

drop table is exists Critere_M;
drop table is exists EtapeACV_M;
drop table is exists NomComposant_M;
drop table is exists Source_M;
drop table is exists Type_M;
drop table is exists Composant_M;
drop table is exists Reference_M;

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
  PRIMARY KEY (`idPush`),
  KEY `fkUser_Push` (`idUser`),
  CONSTRAINT `fkUser_Push` FOREIGN KEY (`idUser`) REFERENCES `User_U` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=424 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  `quantité` int DEFAULT '1',
  PRIMARY KEY (`idItem`),
  KEY `fkPush_Item` (`idPush`),
  KEY `fkReference_Item` (`idReference`),
  CONSTRAINT `fkPush_Item` FOREIGN KEY (`idPush`) REFERENCES `Push_U` (`idPush`),
  CONSTRAINT `fkReference_Item` FOREIGN KEY (`idReference`) REFERENCES `Reference_M` (`idReference`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



