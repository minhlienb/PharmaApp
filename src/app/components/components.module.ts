import { NgModule } from "@angular/core";
import { ProductCardComponent } from "./product-card/product-card.component";
import { RatingPopupComponent } from "./rating-popup/rating-popup.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule, // Thêm các import cần thiết của components
        FormsModule,
        IonicModule,
      ],
    declarations: [ProductCardComponent, RatingPopupComponent],
    exports: [ProductCardComponent, RatingPopupComponent, IonicModule]
})
export class ComponentsModule {}   

// Đây là global component 
// tất cả các component muốn được hiển thị global thì phải define trong này