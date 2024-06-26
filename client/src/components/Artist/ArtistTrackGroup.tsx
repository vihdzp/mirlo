import { css } from "@emotion/css";
import React from "react";
import ClickToPlay from "../common/ClickToPlay";
import { Link } from "react-router-dom";
import { bp } from "../../constants";
import { getArtistUrl, getReleaseUrl } from "utils/artist";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

export const TrackGroupWrapper = styled.div`
  margin-bottom: 0.5rem;

  @media screen and (max-width: ${bp.medium}px) {
    padding: 0;
    margin-bottom: 1rem;
    margin-top: 0rem;
  }

  @media screen and (max-width: ${bp.small}px) {
    font-size: var(--mi-font-size-small);

    button {
      padding: 0.25rem 0.25rem;
      height: 1.4rem;
    }
  }
`;

export const TrackGroupLinks = styled.div`
  font-size: var(--mi-font-size-small);
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: start;
  min-height: 2.5rem;
  width: 100%;
  @media screen and (max-width: ${bp.medium}px) {
    align-items: start;
    margin-bottom: 0rem;
  }
`;

export const TrackGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    text-decoration: none;
  }
  a:first-of-type {
    font-weight: normal;
    margin-bottom: 0.2rem;
  }
  a:last-of-type {
    font-size: var(--mi-font-size-xsmall);
    color: var(--mi-light-foreground-color);
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ArtistTrackGroup: React.FC<{
  trackGroup: TrackGroup;
  as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
}> = ({ trackGroup, as }) => {
  const { t } = useTranslation("translation", { keyPrefix: "clickToPlay" });

  return (
    <TrackGroupWrapper as={as}>
      <div>
        <ClickToPlay
          image={{
            width: 400,
            height: 400,
            url: trackGroup.cover?.sizes?.[600] ?? "",
          }}
          trackGroupId={trackGroup.id}
          title={trackGroup.title}
          trackGroup={trackGroup}
        >
          <TrackGroupLinks>
            <TrackGroupInfo>
              {trackGroup.artist && (
                <Link
                  to={getReleaseUrl(trackGroup.artist, trackGroup)}
                  aria-label={`${t("goToAlbum")}: ${trackGroup.title || t("untitled")}`}
                  className={
                    trackGroup.title.length
                      ? css`
                          color: var(--mi-normal-foreground-color);
                        `
                      : css`
                          color: var(--mi-light-foreground-color);
                          font-style: italic;
                        `
                  }
                >
                  {trackGroup.title.length ? trackGroup.title : t("untitled")}
                </Link>
              )}
              {trackGroup.artist && (
                <Link to={getArtistUrl(trackGroup.artist)}>
                  {trackGroup.artist?.name}
                </Link>
              )}
            </TrackGroupInfo>
            <div
              className={css`
                button {
                  margin-top: -0.25rem;
                }
                @media screen and (max-width: ${bp.small}px) {
                  button {
                    margin-top: -0.1rem;
                    opacity: 0.5;
                  }
                }

                @media screen and (min-width: ${bp.small}px) {
                  display: none!;
                }
              `}
            ></div>
          </TrackGroupLinks>
        </ClickToPlay>
      </div>
    </TrackGroupWrapper>
  );
};

export default ArtistTrackGroup;
