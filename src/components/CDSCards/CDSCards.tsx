// React
import React from "react";
// Styles
import "./CDSCards.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faExclamationCircle,
    faInfoCircle,
    faLightbulb,
    faLink,
} from "@fortawesome/free-solid-svg-icons";

// Types
export interface CDSCardData {
  indicator: "critical" | "warning" | "info" | string;
  summary: string;
  detail?: string;
  source?: {
    url: string;
    label: string;
  };
  suggestions?: Array<{
    uuid?: string;
    label: string;
    actions?: Array<{
      description: string;
    }>;
  }>;
  links?: Array<{
    url: string;
    label: string;
  }>;
  uuid?: string;
}

export interface CDSCardsProps {
  cards: CDSCardData[];
  language?: (key: string) => string;
}

/////////////////////////////////
//           CDSCard           //
/////////////////////////////////

export const CDSCard: React.FC<{ card: CDSCardData }> = ({ card }) => {
    const renderIndicatorIcon = () => {
        switch (card.indicator) {
            case "critical":
                return (
                    <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-danger me-2"
                        title="Critical alert"
                    />
                );
            case "warning":
                return (
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="text-warning me-2"
                        title="Warning"
                    />
                );
            default:
                return (
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-info me-2"
                        title="Information"
                    />
                );
        }
    };
    const headerClass =
        card.indicator === "critical"
            ? "cardHeaderCritical"
            : card.indicator === "warning"
                ? "cardHeaderWarning"
                : "cardHeaderInfo";

    return (
        <div className="cardWrapper">
            <div className={`cardHeader ${headerClass}`}>
                <span className="me-2 fs-4">{renderIndicatorIcon()}</span>
                <h5 className="mb-0">{card.summary}</h5>
            </div>

            <div className="cardBody">
                {/* Detail */}
                {card.detail && <p>{card.detail}</p>}

                {/* Source */}
                {card.source && (
                    <p className="cardSource">
                        Source:{" "}
                        <a
                            href={card.source.url}
                            className="text-decoration-underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {card.source.label}
                        </a>
                    </p>
                )}

                {/* Suggestions */}
                {card.suggestions && card.suggestions.length > 0 && (
                    <div className="mb-2">
                        <strong>
                            <FontAwesomeIcon icon={faLightbulb} className="text-warning me-1" />
                            Suggestions:
                        </strong>
                        <ul className="mt-2 mb-0 ps-3">
                            {card.suggestions.map((s, idx) => (
                                <li key={s.uuid || idx}>
                                    {s.label}
                                    {s.actions && s.actions.length > 0 && (
                                        <ul>
                                            {s.actions.map((a, i) => (
                                                <li key={i}>{a.description}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Links */}
                {card.links && card.links.length > 0 && (
                    <div className="cardLinks">
                        {card.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                className="text-primary me-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faLink} className="me-1" />
                                <span className="text-decoration-underline">{link.label}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/////////////////////////////////
//          CDSCards           //
/////////////////////////////////

export const CDSCards: React.FC<CDSCardsProps> = ({ cards, language }) => {
    if (!cards || cards.length === 0) {
        return (
            <p className="text-muted fst-italic">
                {language ? language('cards.noCardsToDisplay') : 'No cards to display.'}
            </p>
        );
    }

    return (
        <div className="cardsContainer">
            {cards.map((card, idx) => (
                <CDSCard card={card} key={card.uuid ?? idx} />
            ))}
        </div>
    );
};

export default CDSCards;