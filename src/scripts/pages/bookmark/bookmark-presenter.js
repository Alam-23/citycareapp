import { reportMapper } from "../../data/api-mapper";

export default class BookmarkPresenter {
    #view;
    #model;


    constructor({view, model}){
        this.#view = view;
        this.#model = model;
    }

    async showReportListMap() {
        this.#view.showMapLoading();
        try {
            await this.#view.initialMap();
        } catch (error) {
            console.error('showReportsListMap: error:', error);
        } finally {
            this.#view.hideMapLoading();
        }
    }

    async initialGalleryAndMap() {
        this.#view.showReportsListLoading();

        try{
            await this.showReportListMap();
            const listOffReports = await this.#model.getAllReports();
            const reports =  await Promise.all(listOffReports.map(reportMapper));
            
            const message = 'berhasil menambahkan daftar laporan tersimpan';
            this.#view.populateBookmarkedReports(message, reports);
        } catch (error) {
            console.error('initialGalleryAndMap: error:', error);
            this.#view.populateBookmarkedReports(error.message);
        } finally {
            this.#view.hideReportsListLoading();
        }
    }
}